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

export function isPlaceholderDistance(label: string): boolean {
  return isUnknownPriceToken(label);
}
