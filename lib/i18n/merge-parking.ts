import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ParkingOverride = { name: string; pricePerHour: string; distanceLabel: string };

function coalesceField(
  override: string | undefined,
  fromData: string,
  fallback: string
): string {
  const o = override?.trim();
  if (o) return override!;
  const d = fromData.trim();
  if (d) return fromData;
  return fallback;
}

export function mergeParkingForLocale(mock: ParkingLocation[], dict: Dictionary): ParkingLocation[] {
  const overrides = dict.parking as Record<string, ParkingOverride | undefined>;
  const { pricePerHour: defaultPrice, distanceLabel: defaultDistance } = dict.parkingDefaults;
  return mock.map((m) => {
    const p = overrides[m.id];
    return {
      ...m,
      name: p?.name ?? m.name,
      pricePerHour: coalesceField(p?.pricePerHour, m.pricePerHour, defaultPrice),
      distanceLabel: coalesceField(p?.distanceLabel, m.distanceLabel, defaultDistance),
    };
  });
}
