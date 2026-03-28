export type ZoneLookupResponseBody = {
  majorZone: "I" | "II" | "III" | "IV" | null;
  blockId: string | null;
  blockName: string | null;
  confidence: "high" | "medium" | "low";
  note: string | null;
};

export type ZoneLookupErrorBody = {
  error: string;
  message?: string;
};
