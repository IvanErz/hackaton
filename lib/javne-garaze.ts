import { readFileSync } from "node:fs";
import path from "node:path";

import type { ParkingLocation } from "./mock-parking-spaces";

type GarageProps = {
  OBJECTID: number;
  naziv: string;
  adresa: string | null;
  kapacitet: number | null;
};

type GeoJsonFeature = {
  type: "Feature";
  properties: GarageProps;
  geometry: { type: string; coordinates: number[] };
};

type GeoJsonCollection = {
  type: string;
  features: GeoJsonFeature[];
};

/** Deterministic ratio in ~[0.15, 0.75] from OBJECTID for stable mock occupancy. */
function mockAvailabilityRatio(objectId: number): number {
  const t = ((objectId * 7919 + 104729) % 10001) / 10001;
  return 0.15 + t * 0.6;
}

export function loadJavneGaraze(): ParkingLocation[] {
  const filePath = path.join(process.cwd(), "Geoportal_javne_garaze.geojson");
  const raw = readFileSync(filePath, "utf8");
  const data = JSON.parse(raw) as GeoJsonCollection;

  return data.features
    .filter((f) => f.geometry?.type === "Point" && Array.isArray(f.geometry.coordinates))
    .map((f) => {
      const p = f.properties;
      const [lng, lat] = f.geometry.coordinates;
      const cap = p.kapacitet;
      const effectiveCap = cap ?? 250;
      const ratio = mockAvailabilityRatio(p.OBJECTID);
      const freeCount = Math.max(0, Math.floor(effectiveCap * ratio));
      const status: ParkingLocation["status"] =
        effectiveCap > 0 && freeCount / effectiveCap < 0.2 ? "limited" : "open";

      return {
        id: String(p.OBJECTID),
        name: p.naziv,
        address: p.adresa ?? "Zagreb",
        lat,
        lng,
        capacity: cap,
        freeCount,
        status,
        pricePerHour: "",
        distanceLabel: "",
      };
    });
}
