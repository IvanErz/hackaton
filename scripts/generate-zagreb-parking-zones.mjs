#!/usr/bin/env node
/**
 * One-off generator: reads extracted regulation text, writes lib/data/zagreb-parking-zones.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcPath = "/tmp/zagreb_zones_source.txt";
const outPath = path.join(root, "lib/data/zagreb-parking-zones.ts");

let raw = fs.readFileSync(srcPath, "utf8");
raw = raw.replace(/^<user_query>\s*/i, "");
const cutIdx = raw.search(/\bcreate a file that can be used/i);
if (cutIdx !== -1) raw = raw.slice(0, cutIdx);
raw = raw.replace(/[.,\s]+$/g, "").trim();

const guards = [
  ["__G0__", "Trg Ivana, Antuna i Vladimira Mažuranića"],
  ["__G1__", "Barčev trg - kbr. 14, 15 i 16 (tržnica Utrina)"],
  ["__G2__", "Koledinečka ulica - kbr. 4, 6 i 8 (Tržnica Dubrava)"],
  [
    "__G3__",
    "područje omeđeno Ulicom Damira Tomljanovića - Gavrana na sjeveru, Avenijom Većeslava Holjevca na zapadu, Avenijom Dubrovnik na jugu i Ulicom Savezne Republike Njemačke na istoku",
  ],
  [
    "__G4__",
    "prostor omeđen Novom cestom s istočne strane, Nehajskom ulicom sa zapadne strane, Ozaljskom ulicom sa sjeverne strane i Zagrebačkom avenijom s južne strane Radnička cesta (od Avenije Marina Držića do Ulice Vjekoslava Heinzela)",
  ],
  [
    "__G5__",
    "područje omeđeno Hruševečkom ulicom, s dijelom Stubičke ulice i Ulicom Jurja Andrassyja na sjeveru, Selskom cestom na istoku, Ulicom Matka Baštijana na jugu i Vitezićevom ulicom na zapadu",
  ],
];

function splitStreetList(s) {
  let t = s.trim();
  const sorted = [...guards].sort((a, b) => b[1].length - a[1].length);
  for (const [ph, val] of sorted) t = t.split(val).join(ph);
  return t
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => {
      let y = x;
      for (const [ph, val] of guards) y = y.split(ph).join(val);
      return y;
    });
}

function esc(s) {
  return JSON.stringify(s);
}

function linesArr(items) {
  return `[\n${items.map((t) => `      ${esc(t)},`).join("\n")}\n    ]`;
}

/** Collect non-empty lines until next BLOK / major ZONA heading */
function takeBlockLines(startIdx, lines) {
  const out = [];
  for (let i = startIdx; i < lines.length; i++) {
    const L = lines[i].trim();
    if (!L) continue;
    if (/^BLOK \d/.test(L)) break;
    if (/^ZONA (I|II|III)\. dijeli se na:/.test(L)) break;
    if (/^(III\. ZONA|IV\. ZONA|IV\. \d|PARKIRALIŠTA|I\.1\. ZONA|I\.2\. ZONA|II\. ZONA|II\.\d)/.test(L)) break;
    out.push(L);
  }
  return out;
}

const lines = raw.split("\n");

// --- Zone I coverage (list may follow on next line after header)
const iHead = lines.findIndex((l) => l.includes("I. ZONA obuhvaća"));
const zoneI1Idx = lines.findIndex((l) => l.startsWith("I.1. ZONA"));
const iCovParts = [];
const sameLine = lines[iHead].split("obuhvaća područje:")[1]?.trim();
if (sameLine) iCovParts.push(sameLine);
for (let j = iHead + 1; j < zoneI1Idx; j++) {
  const L = lines[j].trim();
  if (L) iCovParts.push(L);
}
const zoneICoverage = splitStreetList(iCovParts.join(" "));

const i1LineIdx = lines.findIndex((l) => l.trim().startsWith("I.1."));
const i2LineIdx = lines.findIndex((l) => l.trim().startsWith("I.2."));
const i1Inline = lines[i1LineIdx].trim().replace(/^I\.1\.\s*ZONA\s*/i, "").trim();
const i1More = lines
  .slice(i1LineIdx + 1, i2LineIdx)
  .map((l) => l.trim())
  .filter(Boolean)
  .join(" ");
const zoneI1List = splitStreetList([i1Inline, i1More].filter(Boolean).join(" "));

const divideIdx = lines.findIndex((l) => l.startsWith("ZONA I. dijeli se na:"));
const i2Paragraph = lines.slice(i2LineIdx + 1, divideIdx).join(" ").trim();

// Blocks I
function findBlockStart(id) {
  const re = new RegExp(`^BLOK ${id}\\b`);
  return lines.findIndex((l) => re.test(l.trim()));
}

const block1 = (() => {
  const si = findBlockStart("1");
  const blines = takeBlockLines(si + 1, lines);
  return { id: "1", name: "ZONA I.1. Gornji grad", lines: blines };
})();
const block2 = { id: "2", name: undefined, lines: takeBlockLines(findBlockStart("2") + 1, lines) };
const block3 = { id: "3", name: undefined, lines: takeBlockLines(findBlockStart("3") + 1, lines) };
const block5 = { id: "5", name: undefined, lines: takeBlockLines(findBlockStart("5") + 1, lines) };
const block6 = { id: "6", name: undefined, lines: takeBlockLines(findBlockStart("6") + 1, lines) };

// Zone II — II.1 list is on the line after "II. ZONA obuhvaća", prefixed with "II.1."
const iiHeadIdx = lines.findIndex((l) => l.startsWith("II. ZONA obuhvaća"));
const ii22Idx = lines.findIndex((l) => l.startsWith("II.2."));
const ii1Line = lines[iiHeadIdx + 1] ?? "";
const ii1Body = ii1Line.replace(/^II\.1\.\s*/i, "").trim();
const ii1More = lines
  .slice(iiHeadIdx + 2, ii22Idx)
  .map((l) => l.trim())
  .filter(Boolean)
  .join(" ");
const zoneII1Lines = splitStreetList([ii1Body, ii1More].filter(Boolean).join(" "));

const ii2Text = lines[ii22Idx].replace(/^II\.2\.\s*/, "").trim();
const ii3Idx = lines.findIndex((l) => l.trim().startsWith("II.3."));
const ii3Text = lines[ii3Idx].trim().replace(/^II\.3\.\s*/, "").trim();
const zoneII3Lines = splitStreetList(ii3Text);

const iiDivide = lines.findIndex((l) => l.startsWith("ZONA II. dijeli se na:"));

const block4 = { id: "4", name: undefined, lines: takeBlockLines(findBlockStart("4") + 1, lines) };
const block7 = { id: "7", name: undefined, lines: takeBlockLines(findBlockStart("7") + 1, lines) };
const block8 = { id: "8", name: undefined, lines: takeBlockLines(findBlockStart("8") + 1, lines) };
const block9 = { id: "9", name: undefined, lines: takeBlockLines(findBlockStart("9") + 1, lines) };
const block10 = { id: "10", name: "Savica", lines: takeBlockLines(findBlockStart("10") + 1, lines) };
const block12 = { id: "12", name: undefined, lines: takeBlockLines(findBlockStart("12") + 1, lines) };
const block13 = { id: "13", name: undefined, lines: takeBlockLines(findBlockStart("13") + 1, lines) };
const block15 = { id: "15", name: "Siget", lines: takeBlockLines(findBlockStart("15") + 1, lines) };
const block16 = { id: "16", name: "Središće", lines: takeBlockLines(findBlockStart("16") + 1, lines) };

// Zone III
const iiiHeadIdx = lines.findIndex((l) => l.startsWith("III. ZONA obuhvaća"));
const sesIdx = lines.findIndex((l) => l.startsWith("Na području Sesveta:"));
const iiiSame = lines[iiiHeadIdx].split("obuhvaća područje:")[1]?.trim() ?? "";
const iiiMid = lines
  .slice(iiiHeadIdx + 1, sesIdx)
  .map((l) => l.trim())
  .filter(Boolean)
  .join(" ");
let iiiMainText = [iiiSame, iiiMid].filter(Boolean).join(" ");
iiiMainText = iiiMainText
  .replace(/Veslačka ulica\./g, "Veslačka ulica")
  .replace(/Stahuljaka\./g, "Stahuljaka");
const iiiSesText = lines[sesIdx]
  .replace(/^Na području Sesveta:\s*/, "")
  .trim()
  .replace(/Stahuljaka\./g, "Stahuljaka");

const zoneIIICoverage = [...splitStreetList(iiiMainText), ...splitStreetList(iiiSesText)];

const block11 = { id: "11", name: "Cvjetno naselje", lines: takeBlockLines(findBlockStart("11") + 1, lines) };
const block14 = { id: "14", name: undefined, lines: takeBlockLines(findBlockStart("14") + 1, lines) };
const block17 = { id: "17", name: "Tržnica Utrine", lines: takeBlockLines(findBlockStart("17") + 1, lines) };
const block18 = { id: "18", name: "Tržnica Dubrava", lines: takeBlockLines(findBlockStart("18") + 1, lines) };
const block19 = { id: "19", name: "Sesvete", lines: takeBlockLines(findBlockStart("19") + 1, lines) };
const block20 = { id: "20", name: "Novi Jelkovec", lines: takeBlockLines(findBlockStart("20") + 1, lines) };
const block21 = { id: "21", name: "Tržnica Vrapče", lines: takeBlockLines(findBlockStart("21") + 1, lines) };
const block22 = { id: "22", name: "Tržnica Špansko", lines: takeBlockLines(findBlockStart("22") + 1, lines) };
const block23 = { id: "23", name: "Tržnica Jarun", lines: takeBlockLines(findBlockStart("23") + 1, lines) };

const parkIdx = lines.findIndex((l) => l.startsWith("PARKIRALIŠTA KOJA NISU DIO BLOKOVA:"));
const ivIdx = lines.findIndex((l) => l.startsWith("IV. ZONA"));
const extraLines = takeBlockLines(parkIdx + 1, lines);

// Zone IV
const ivHead = lines[ivIdx].replace(/^IV\. ZONA.*obuhvaća područje:\s*/, "").trim();
const iv1Idx = lines.findIndex((l) => l.startsWith("IV. 1. ZONA:"));
const iv2Idx = lines.findIndex((l) => l.startsWith("IV. 2. ZONA:"));
const iv1Lines = [];
for (let i = iv1Idx + 1; i < iv2Idx; i++) {
  let L = lines[i].trim();
  if (!L) continue;
  L = L.replace(/^-\s*/, "").replace(/,\s*$/g, "").trim();
  iv1Lines.push(L);
}
const iv2Lines = lines
  .slice(iv2Idx + 1)
  .map((l) => l.trim().replace(/,\s*$/g, "").trim())
  .filter(Boolean);

function emitBlock(b) {
  const namePart = b.name ? `\n      name: ${esc(b.name)},` : "";
  return `      {
      id: ${esc(b.id)},${namePart}
      lines: ${linesArr(b.lines)},
    }`;
}

const header = `/**
 * Zagreb public parking zone regulations (structured excerpt).
 * Source: City of Zagreb parking zone ordinance excerpt (Croatian), as provided for the ParkSpot project.
 * Not geometry — streets and boundary descriptions as in the legal wording.
 */

export type ParkingZoneBlock = {
  id: string;
  name?: string;
  lines: readonly string[];
};

export type ParkingZoneSection = {
  code: string;
  title?: string;
  lines?: readonly string[];
  blocks?: readonly ParkingZoneBlock[];
};

export type ParkingMajorZone = {
  code: "I" | "II" | "III" | "IV";
  label?: string;
  coverageLines?: readonly string[];
  sections?: readonly ParkingZoneSection[];
  blocks?: readonly ParkingZoneBlock[];
};

export const ZAGREB_PARKING_ZONES: readonly ParkingMajorZone[] = [
`;

const zoneI = `  {
    code: "I",
    label: "ZONA I",
    coverageLines: ${linesArr(zoneICoverage)},
    sections: [
      {
        code: "I.1",
        title: "ZONA I.1",
        lines: ${linesArr(zoneI1List)},
      },
      {
        code: "I.2",
        title: "ZONA I.2",
        lines: ${linesArr([i2Paragraph])},
      },
    ],
    blocks: [
${emitBlock(block1)},
${emitBlock(block2)},
${emitBlock(block3)},
${emitBlock(block5)},
${emitBlock(block6)},
    ],
  },
`;

const zoneII = `  {
    code: "II",
    label: "ZONA II",
    sections: [
      {
        code: "II.1",
        title: "ZONA II.1",
        lines: ${linesArr(zoneII1Lines)},
      },
      {
        code: "II.2",
        title: "ZONA II.2",
        lines: ${linesArr([ii2Text])},
      },
      {
        code: "II.3",
        title: "ZONA II.3",
        lines: ${linesArr(zoneII3Lines)},
      },
    ],
    blocks: [
${emitBlock(block4)},
${emitBlock(block7)},
${emitBlock(block8)},
${emitBlock(block9)},
${emitBlock(block10)},
${emitBlock(block12)},
${emitBlock(block13)},
${emitBlock(block15)},
${emitBlock(block16)},
    ],
  },
`;

const zoneIII = `  {
    code: "III",
    label: "ZONA III",
    coverageLines: ${linesArr(zoneIIICoverage)},
    sections: [
      {
        code: "extra",
        title: "PARKIRALIŠTA KOJA NISU DIO BLOKOVA",
        lines: ${linesArr(extraLines)},
      },
    ],
    blocks: [
${emitBlock(block11)},
${emitBlock(block14)},
${emitBlock(block17)},
${emitBlock(block18)},
${emitBlock(block19)},
${emitBlock(block20)},
${emitBlock(block21)},
${emitBlock(block22)},
${emitBlock(block23)},
    ],
  },
`;

const zoneIV = `  {
    code: "IV",
    label: "ZONA IV (izvanulična javna parkirališta)",
    sections: [
      {
        code: "IV.1",
        title: "IV.1. ZONA",
        lines: ${linesArr(iv1Lines)},
      },
      {
        code: "IV.2",
        title: "IV.2. ZONA",
        lines: ${linesArr(iv2Lines)},
      },
    ],
  },
`;

const footer = `] as const satisfies readonly ParkingMajorZone[];
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, header + zoneI + zoneII + zoneIII + zoneIV + footer);
console.log("Wrote", outPath, "bytes", fs.statSync(outPath).size);
