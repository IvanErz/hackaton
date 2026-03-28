/** Em dash and common dash-only placeholders */
function isUnknownPriceToken(s: string): boolean {
  const t = s.trim();
  if (t === "") return true;
  if (/^[—\-–\s]+$/u.test(t)) return true;
  return t === "—";
}

const FREE_PATTERN =
  /^(free|besplatno|besplatni|0(\s*(€|eur|kn|hrk))?|0[,.]00)$/iu;

/**
 * Turns raw `pricePerHour` into a short label: explicit free, unknown → paid, else the rate string.
 */
export function formatParkingPrice(
  pricePerHour: string,
  labels: { free: string; paidUnknown: string }
): string {
  const raw = pricePerHour.trim();
  if (isUnknownPriceToken(pricePerHour)) return labels.paidUnknown;
  if (FREE_PATTERN.test(raw) || /^0[,.]0+\s*([€$]|eur|kn)?$/iu.test(raw)) {
    return labels.free;
  }
  return pricePerHour;
}

type GaragePriceLabels = {
  free: string;
  paidUnknown: string;
  priceLineSeparator: string;
};

function segmentLabel(raw: string, labels: { free: string; paidUnknown: string }): string | null {
  if (isUnknownPriceToken(raw)) return null;
  const t = raw.trim();
  if (FREE_PATTERN.test(t) || /^0[,.]0+\s*([€$]|eur|kn)?$/iu.test(t)) {
    return labels.free;
  }
  return raw;
}

/**
 * Combines hourly and daily tariff strings; unknown-only shows paidUnknown.
 */
export function formatGaragePriceLine(
  pricePerHour: string,
  pricePerDay: string,
  labels: GaragePriceLabels
): string {
  const hourPart = segmentLabel(pricePerHour, labels);
  const dayPart = segmentLabel(pricePerDay, labels);
  const parts = [hourPart, dayPart].filter((p): p is string => p != null);
  if (parts.length === 0) return labels.paidUnknown;
  return parts.join(labels.priceLineSeparator);
}

export function isPlaceholderDistance(label: string): boolean {
  return isUnknownPriceToken(label);
}
