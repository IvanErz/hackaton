import { readFileSync } from "node:fs";
import path from "node:path";

export type EvChargingStation = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  connectorCount: number | null;
  connectorType: string | null;
};

type EvProps = {
  OBJECTID_1: number;
  NAZIV: string;
  ADRESA: string | null;
  BROJ_UTICNICA: number | null;
  TIP_UTICNICE: string | null;
};

type GeoJsonFeature = {
  type: "Feature";
  properties: EvProps;
  geometry: { type: string; coordinates: number[] };
};

type GeoJsonCollection = {
  type: string;
  features: GeoJsonFeature[];
};

export function loadEvChargingStations(): EvChargingStation[] {
  const filePath = path.join(process.cwd(), "Geoportal_elektricne_punionice.geojson");
  const raw = readFileSync(filePath, "utf8");
  const data = JSON.parse(raw) as GeoJsonCollection;

  return data.features
    .filter((f) => f.geometry?.type === "Point" && Array.isArray(f.geometry.coordinates))
    .map((f) => {
      const p = f.properties;
      const [lng, lat] = f.geometry.coordinates;
      return {
        id: `ev-${p.OBJECTID_1}`,
        name: p.NAZIV,
        address: p.ADRESA ?? "Zagreb",
        lat,
        lng,
        connectorCount: p.BROJ_UTICNICA,
        connectorType: p.TIP_UTICNICE,
      };
    });
}
