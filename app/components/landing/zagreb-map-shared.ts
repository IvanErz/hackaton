import type { ParkingLocation } from "@/lib/mock-parking-spaces";

export const NEAREST_COUNT = 5;

export function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const s =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function formatDistance(meters: number, mLabel: string, kmLabel: string): string {
  if (meters < 1000) {
    return `${Math.round(meters)} ${mLabel}`;
  }
  return `${(meters / 1000).toFixed(1)} ${kmLabel}`;
}

export function latLngFromPlaceLocation(
  loc: google.maps.LatLng | google.maps.LatLngLiteral | undefined | null
): { lat: number; lng: number } | null {
  if (loc == null) return null;
  if (typeof (loc as google.maps.LatLng).lat === "function") {
    const l = loc as google.maps.LatLng;
    return { lat: l.lat(), lng: l.lng() };
  }
  const literal = loc as google.maps.LatLngLiteral;
  return { lat: literal.lat, lng: literal.lng };
}

/** gmp-select event shape (Place Autocomplete widget); not fully modeled in @types/google.maps. */
export type GmpSelectEvent = Event & {
  placePrediction: { toPlace: () => google.maps.places.Place };
};

/** @types/google.maps lags PlaceAutocompleteElement widget properties. */
export type PlaceAutocompleteWidget = google.maps.places.PlaceAutocompleteElement & {
  placeholder?: string;
  includedRegionCodes?: string[];
  locationBias?: google.maps.CircleLiteral | google.maps.Circle;
};

export function nearestGaragesForDestination(
  locations: ParkingLocation[],
  destination: { lat: number; lng: number } | null
): { loc: ParkingLocation; d: number }[] {
  if (!destination) return [];
  return [...locations]
    .map((loc) => ({
      loc,
      d: haversineMeters(destination.lat, destination.lng, loc.lat, loc.lng),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, NEAREST_COUNT);
}
