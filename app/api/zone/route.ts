import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { ZAGREB_PARKING_ZONES_CONTEXT_MARKDOWN } from "@/lib/data/zagreb-parking-zones-context";
import type { ZoneLookupResponseBody } from "@/lib/zone-lookup-types";
import { NextResponse } from "next/server";

type MajorZoneCode = "I" | "II" | "III" | "IV";
type MajorZone = MajorZoneCode | null;
const MAJOR_ZONES = new Set<MajorZoneCode>(["I", "II", "III", "IV"]);

const CONFIDENCE = new Set(["high", "medium", "low"] as const);
type Confidence = "high" | "medium" | "low";

const DEFAULT_MODEL = "gemini-2.0-flash";
const MAX_NOTE_LEN = 500;
const MAX_BLOCK_STR = 200;

type RawZonePayload = {
  majorZone?: unknown;
  blockId?: unknown;
  blockName?: unknown;
  confidence?: unknown;
  note?: unknown;
};

function clampStr(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
}

function normalizePayload(raw: RawZonePayload): ZoneLookupResponseBody {
  let majorZone: MajorZone = null;
  if (typeof raw.majorZone === "string" && MAJOR_ZONES.has(raw.majorZone as MajorZoneCode)) {
    majorZone = raw.majorZone as MajorZoneCode;
  }

  let confidence: Confidence = "low";
  if (typeof raw.confidence === "string" && CONFIDENCE.has(raw.confidence as Confidence)) {
    confidence = raw.confidence as Confidence;
  }

  return {
    majorZone,
    blockId: clampStr(raw.blockId, MAX_BLOCK_STR),
    blockName: clampStr(raw.blockName, MAX_BLOCK_STR),
    confidence,
    note: clampStr(raw.note, MAX_NOTE_LEN),
  };
}

const SYSTEM_INSTRUCTION = [
  "You classify whether a location in Zagreb, Croatia falls into a public parking tariff major zone (I, II, III, or IV)",
  "using ONLY the ordinance excerpt provided in the user message.",
  "The excerpt lists streets and areas per zone; it is not a map — use street/place names from the user's address.",
  "If the excerpt does not let you determine the zone, set majorZone to null and explain briefly in note.",
  "Set blockId and blockName only when a specific block in the excerpt clearly applies; otherwise null.",
  "Respond only with JSON matching the schema (no markdown).",
].join(" ");

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "NOT_CONFIGURED", message: "GEMINI_API_KEY is not set" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "BAD_INPUT", message: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "BAD_INPUT", message: "Body must be an object" }, { status: 400 });
  }

  const { address, lat, lng } = body as Record<string, unknown>;
  if (typeof address !== "string" || !address.trim()) {
    return NextResponse.json({ error: "BAD_INPUT", message: "address is required" }, { status: 400 });
  }

  const trimmedAddress = address.trim();
  let coordsLine = "";
  if (typeof lat === "number" && Number.isFinite(lat) && typeof lng === "number" && Number.isFinite(lng)) {
    coordsLine = `\nApproximate coordinates (from place picker): ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }

  const userText = [
    "REFERENCE (Zagreb parking zones ordinance excerpt):",
    "",
    ZAGREB_PARKING_ZONES_CONTEXT_MARKDOWN,
    "",
    "---",
    "",
    "LOCATION TO CLASSIFY:",
    trimmedAddress,
    coordsLine,
  ].join("\n");

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          majorZone: {
            type: SchemaType.STRING,
            format: "enum",
            enum: ["I", "II", "III", "IV"],
            nullable: true,
            description:
              "Roman numeral tariff zone from the excerpt, or null if it cannot be determined.",
          },
          blockId: {
            type: SchemaType.STRING,
            nullable: true,
            description: "Block identifier from the excerpt when applicable.",
          },
          blockName: {
            type: SchemaType.STRING,
            nullable: true,
            description: "Human-readable block name from the excerpt when applicable.",
          },
          confidence: {
            type: SchemaType.STRING,
            format: "enum",
            enum: ["high", "medium", "low"],
            description: "How confident the classification is given the text-only rules.",
          },
          note: {
            type: SchemaType.STRING,
            nullable: true,
            description: "Short caveat or reason for null zone.",
          },
        },
        required: ["majorZone", "blockId", "blockName", "confidence", "note"],
      },
    },
  });

  try {
    const result = await model.generateContent(userText);
    const text = result.response.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(text) as RawZonePayload;
    } catch {
      return NextResponse.json(
        { error: "MODEL_ERROR", message: "Model returned non-JSON" },
        { status: 502 },
      );
    }

    if (typeof parsed !== "object" || parsed === null) {
      return NextResponse.json({ error: "MODEL_ERROR", message: "Invalid model payload" }, { status: 502 });
    }

    const normalized = normalizePayload(parsed as RawZonePayload);
    return NextResponse.json(normalized);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: "MODEL_ERROR", message }, { status: 502 });
  }
}
