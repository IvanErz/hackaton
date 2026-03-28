export type ParkingLocation = {
  id: string;
  name: string;
  freeCount: number;
  address: string;
  distanceLabel: string;
  pricePerHour: string;
  status: "open" | "limited";
  lat: number;
  lng: number;
};

/** Approximate centre of Zagreb for map defaults */
export const ZAGREB_CENTER: [number, number] = [45.815, 15.9819];

export const MOCK_PARKING_SPACES: ParkingLocation[] = [
  {
    id: "1",
    name: "Garaža Glavni kolodvor",
    freeCount: 42,
    address: "Trg kralja Tomislava 12, Zagreb",
    distanceLabel: "240 m",
    pricePerHour: "2,00 € / h",
    status: "open",
    lat: 45.8053,
    lng: 15.9785,
  },
  {
    id: "2",
    name: "Langov trg — otvoreno parkiralište",
    freeCount: 8,
    address: "Langov trg, Zagreb",
    distanceLabel: "0,5 km",
    pricePerHour: "1,50 € / h",
    status: "limited",
    lat: 45.8078,
    lng: 15.9692,
  },
  {
    id: "3",
    name: "Garaža Importanne / Green Gold",
    freeCount: 156,
    address: "Slavonska avenija 6d, Zagreb",
    distanceLabel: "120 m",
    pricePerHour: "2,50 € / h",
    status: "open",
    lat: 45.8071,
    lng: 15.9584,
  },
  {
    id: "4",
    name: "Garaža Arena Zagreb",
    freeCount: 23,
    address: "Lanište ul. bb, Zagreb",
    distanceLabel: "1,2 km",
    pricePerHour: "Prvi sat besplatno",
    status: "open",
    lat: 45.7649,
    lng: 15.9466,
  },
];
