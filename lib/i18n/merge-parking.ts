import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function mergeParkingForLocale(mock: ParkingLocation[], dict: Dictionary): ParkingLocation[] {
  return mock.map((m) => {
    const p = dict.parking[m.id as keyof Dictionary["parking"]];
    return {
      ...m,
      name: p.name,
      pricePerHour: p.pricePerHour,
      distanceLabel: p.distanceLabel,
    };
  });
}
