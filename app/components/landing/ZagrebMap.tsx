"use client";

import { ZAGREB_CENTER, type ParkingLocation } from "@/lib/mock-parking-spaces";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const parkingIcon = L.divIcon({
  className: "leaflet-div-icon parking-marker-pin",
  html: `<span class="parking-marker-dot" aria-hidden="true"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
});

function FitBounds({ locations }: { locations: ParkingLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
    if (!bounds.isValid()) return;
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 13 });
  }, [map, locations]);

  return null;
}

type Props = {
  locations: ParkingLocation[];
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
};

export function ZagrebMap({ locations, freeSpotsLabel, capacityLabel, mockEstimateNote }: Props) {
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
      <FitBounds locations={locations} />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={parkingIcon}>
          <Popup>
            <span className="font-semibold">{loc.name}</span>
            <br />
            <span className="text-zinc-600">{loc.address}</span>
            <br />
            <span>
              {loc.freeCount} {freeSpotsLabel}
              {loc.capacity != null ? (
                <>
                  {" "}
                  · {capacityLabel}: {loc.capacity}
                </>
              ) : null}
            </span>
            <br />
            <span className="text-xs text-zinc-500">{mockEstimateNote}</span>
            {loc.pricePerHour !== "—" || loc.distanceLabel !== "—" ? (
              <>
                <br />
                <span className="text-zinc-600">
                  {loc.pricePerHour} · {loc.distanceLabel}
                </span>
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
