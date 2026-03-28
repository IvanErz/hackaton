/**
 * Daytime hourly rate (first “Hourly - day-time” row) and 24-hour permit price
 * from ZagrebParking public garage pages (zagrebparking.hr), March 2026.
 * Private / mall garages: null until verified from each operator.
 */

export type GarageTariffEur = {
  hourlyEur: number | null;
  /** “24 hour” / cjelodnevna permit where listed */
  dailyEur: number | null;
};

/** Key: Geoportal OBJECTID (javne_garaze) */
export const GARAGE_TARIFFS_EUR: Record<number, GarageTariffEur> = {
  // ZagrebParking — source: individual garage “prices and terms” pages
  1: { hourlyEur: 1.1, dailyEur: 6.6 }, // Gorica
  2: { hourlyEur: 1.6, dailyEur: 13.3 }, // Langov trg
  3: { hourlyEur: 0.8, dailyEur: 4.0 }, // Rebro
  4: { hourlyEur: 1.6, dailyEur: 13.3 }, // Tuškanac
  5: { hourlyEur: 1.1, dailyEur: 6.6 }, // Kvaternikov trg
  6: { hourlyEur: 1.6, dailyEur: 13.3 }, // Petrinjska
  7: { hourlyEur: 0.5, dailyEur: 4.0 }, // Svetice
  8: { hourlyEur: null, dailyEur: null },
  9: { hourlyEur: null, dailyEur: null },
  10: { hourlyEur: null, dailyEur: null },
  11: { hourlyEur: null, dailyEur: null },
  12: { hourlyEur: null, dailyEur: null },
  13: { hourlyEur: null, dailyEur: null },
  14: { hourlyEur: null, dailyEur: null },
  15: { hourlyEur: null, dailyEur: null },
  16: { hourlyEur: null, dailyEur: null },
  17: { hourlyEur: null, dailyEur: null },
  18: { hourlyEur: null, dailyEur: null },
  19: { hourlyEur: null, dailyEur: null },
  20: { hourlyEur: null, dailyEur: null },
  21: { hourlyEur: null, dailyEur: null },
  22: { hourlyEur: null, dailyEur: null },
  23: { hourlyEur: null, dailyEur: null },
  24: { hourlyEur: null, dailyEur: null },
  25: { hourlyEur: null, dailyEur: null },
  26: { hourlyEur: null, dailyEur: null },
  27: { hourlyEur: 0.4, dailyEur: 1.3 }, // Jelkovec 1
  28: { hourlyEur: null, dailyEur: null },
  29: { hourlyEur: null, dailyEur: null },
  30: { hourlyEur: null, dailyEur: null },
  31: { hourlyEur: null, dailyEur: null },
  32: { hourlyEur: null, dailyEur: null },
  33: { hourlyEur: null, dailyEur: null },
  34: { hourlyEur: null, dailyEur: null },
  // Jelkovec 2: site lists only monthly prepaid (no hourly/24h table)
  35: { hourlyEur: null, dailyEur: null },
  36: { hourlyEur: 0.7, dailyEur: 4.0 }, // KB Sveti Duh (satna dnevna / cjelodnevna)
};

export function getGarageTariffEur(objectId: number): GarageTariffEur {
  return GARAGE_TARIFFS_EUR[objectId] ?? { hourlyEur: null, dailyEur: null };
}
