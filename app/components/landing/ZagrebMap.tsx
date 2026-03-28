"use client";

import { ZAGREB_CENTER, type ParkingLocation } from "@/lib/mock-parking-spaces";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const parkingIcon = L.divIcon({
  className: "leaflet-div-icon parking-marker-pin",
  html: `<span class="parking-marker-dot" aria-hidden="true"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
});

type Props = {
  locations: ParkingLocation[];
  freeSpotsLabel: string;
};

export function ZagrebMap({ locations, freeSpotsLabel }: Props) {
  return (
    <MapContainer
      center={ZAGREB_CENTER}
      zoom={12}
      className="zagreb-map z-0 h-[min(56vh,420px)] w-full min-h-[240px] rounded-2xl sm:h-[min(50vh,480px)] sm:min-h-[280px]"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={parkingIcon}>
          <Popup>
            <span className="font-semibold">{loc.name}</span>
            <br />
            <span className="text-zinc-600">{loc.address}</span>
            <br />
            <span>
              {loc.freeCount} {freeSpotsLabel} · {loc.pricePerHour}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
