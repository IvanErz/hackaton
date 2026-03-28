import type { Locale } from "@/lib/i18n/config";
import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ParkingOverride = {
  name?: string;
  pricePerHour?: string;
  pricePerDay?: string;
  distanceLabel?: string;
};

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

function formatEurSegment(
  eur: number | null,
  locale: Locale,
  suffix: string
): string {
  if (eur == null) return "";
  const loc = locale === "hr" ? "hr-HR" : "en-GB";
  const fmt = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR" });
  return `${fmt.format(eur)}${suffix}`;
}

export function mergeParkingForLocale(
  mock: ParkingLocation[],
  dict: Dictionary,
  locale: Locale
): ParkingLocation[] {
  const overrides = dict.parking as Record<string, ParkingOverride | undefined>;
  const {
    pricePerHour: defaultHour,
    pricePerDay: defaultDay,
    distanceLabel: defaultDistance,
  } = dict.parkingDefaults;
  const { perHourSuffix, perDaySuffix } = dict.parkingPriceLabels;

  return mock.map((m) => {
    const p = overrides[m.id];
    const hourFromTariff = formatEurSegment(m.tariffHourEur, locale, perHourSuffix);
    const dayFromTariff = formatEurSegment(m.tariffDayEur, locale, perDaySuffix);

    return {
      ...m,
      name: p?.name ?? m.name,
      pricePerHour: coalesceField(p?.pricePerHour, hourFromTariff, defaultHour),
      pricePerDay: coalesceField(p?.pricePerDay, dayFromTariff, defaultDay),
      distanceLabel: coalesceField(p?.distanceLabel, m.distanceLabel, defaultDistance),
    };
  });
}
