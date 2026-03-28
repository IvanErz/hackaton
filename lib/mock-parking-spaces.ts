export type ParkingLocation = {
  id: string;
  name: string;
  freeCount: number;
  /** Published capacity from Geoportal; null when not given in the dataset. */
  capacity: number | null;
  address: string;
  distanceLabel: string;
  pricePerHour: string;
  status: "open" | "limited";
  lat: number;
  lng: number;
};

/** Approximate centre of Zagreb for map defaults */
export const ZAGREB_CENTER: [number, number] = [45.815, 15.9819];
