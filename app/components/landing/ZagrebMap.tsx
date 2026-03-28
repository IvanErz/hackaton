"use client";

import { ZAGREB_CENTER, type ParkingLocation } from "@/lib/mock-parking-spaces";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

const defaultCenter = { lat: ZAGREB_CENTER[0], lng: ZAGREB_CENTER[1] };

const mapContainerClassName =
  "zagreb-map z-0 h-[min(56vh,420px)] w-full min-h-[240px] rounded-2xl sm:h-[min(50vh,480px)] sm:min-h-[280px]";

const mapOptions: google.maps.MapOptions = {
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
};

type Props = {
  locations: ParkingLocation[];
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
  missingApiKeyMessage: string;
};

export function ZagrebMap({
  locations,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
  missingApiKeyMessage,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fitBounds = useCallback(
    (map: google.maps.Map) => {
      if (locations.length === 0) return;
      const bounds = new google.maps.LatLngBounds();
      for (const l of locations) {
        bounds.extend({ lat: l.lat, lng: l.lng });
      }
      map.fitBounds(bounds, 32);
      google.maps.event.addListenerOnce(map, "idle", () => {
        const z = map.getZoom();
        if (z !== undefined && z > 14) {
          map.setZoom(14);
        }
      });
    },
    [locations]
  );

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      fitBounds(map);
    },
    [fitBounds]
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    fitBounds(map);
  }, [fitBounds, locations]);

  if (!apiKey) {
    return (
      <div
        className={`${mapContainerClassName} flex items-center justify-center border border-dashed border-zinc-300 bg-zinc-50 px-4 text-center text-sm text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-400`}
        role="status"
      >
        {missingApiKeyMessage}
      </div>
    );
  }

  const selected = selectedId ? locations.find((l) => l.id === selectedId) : undefined;

  return (
    <LoadScript googleMapsApiKey={apiKey} loadingElement={<div className={mapContainerClassName} aria-hidden />}>
      <GoogleMap
        mapContainerClassName={mapContainerClassName}
        center={defaultCenter}
        zoom={12}
        onLoad={onMapLoad}
        options={mapOptions}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSelectedId(loc.id === selectedId ? null : loc.id)}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelectedId(null)}
          >
            <div className="max-w-[220px] text-sm text-zinc-900">
              <p className="font-semibold">{selected.name}</p>
              <p className="mt-1 text-zinc-600">{selected.address}</p>
              <p className="mt-2">
                {selected.freeCount} {freeSpotsLabel}
                {selected.capacity != null ? (
                  <>
                    {" "}
                    · {capacityLabel}: {selected.capacity}
                  </>
                ) : null}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{mockEstimateNote}</p>
              {selected.pricePerHour !== "—" || selected.distanceLabel !== "—" ? (
                <p className="mt-2 text-zinc-600">
                  {selected.pricePerHour} · {selected.distanceLabel}
                </p>
              ) : null}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}
