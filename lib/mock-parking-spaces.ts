export type ParkingLocation = {
  id: string;
  name: string;
  freeCount: number;
  address: string;
  distanceLabel: string;
  pricePerHour: string;
  status: "open" | "limited";
};

export const MOCK_PARKING_SPACES: ParkingLocation[] = [
  {
    id: "1",
    name: "Central Station Garage",
    freeCount: 42,
    address: "12 Station Rd",
    distanceLabel: "240 m",
    pricePerHour: "$2.50",
    status: "open",
  },
  {
    id: "2",
    name: "Riverside Lot",
    freeCount: 8,
    address: "88 River Walk",
    distanceLabel: "0.5 km",
    pricePerHour: "$1.75",
    status: "limited",
  },
  {
    id: "3",
    name: "Market Square Underground",
    freeCount: 156,
    address: "3 Market Pl",
    distanceLabel: "120 m",
    pricePerHour: "$3.00",
    status: "open",
  },
  {
    id: "4",
    name: "Tech Campus East",
    freeCount: 23,
    address: "401 Innovation Dr",
    distanceLabel: "1.2 km",
    pricePerHour: "Free 1st hr",
    status: "open",
  },
];
