import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ParkingOverride = { name: string; pricePerHour: string; distanceLabel: string };

export function mergeParkingForLocale(mock: ParkingLocation[], dict: Dictionary): ParkingLocation[] {
  const overrides = dict.parking as Record<string, ParkingOverride | undefined>;
  return mock.map((m) => {
    const p = overrides[m.id];
    return {
      ...m,
      name: p?.name ?? m.name,
      pricePerHour: p?.pricePerHour ?? dict.parkingDefaults.pricePerHour,
      distanceLabel: p?.distanceLabel ?? dict.parkingDefaults.distanceLabel,
    };
  });
}
