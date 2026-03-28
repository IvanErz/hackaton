"use client";

import type { EvChargingStation } from "@/lib/ev-charging-stations";
import { formatGaragePriceLine, isPlaceholderDistance } from "@/lib/parking-price-display";
import { ZAGREB_CENTER, type ParkingLocation } from "@/lib/mock-parking-spaces";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useRef } from "react";

const defaultCenter = { lat: ZAGREB_CENTER[0], lng: ZAGREB_CENTER[1] };

export const mapContainerClassName =
  "zagreb-map z-0 h-[min(56vh,420px)] w-full min-h-[240px] rounded-2xl sm:h-[min(50vh,480px)] sm:min-h-[280px]";

const mapOptions: google.maps.MapOptions = {
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
};

/** Distinct from blue garage circles */
const destinationIcon: google.maps.Icon = {
  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
};

const evChargingIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
  <circle cx="16" cy="16" r="14" fill="#16a34a" stroke="#fff" stroke-width="2"/>
  <path fill="#fff" d="M18 7 10 16.5h4.5L13 26l10-9.5h-4.5L18 7z"/>
</svg>`;

const evChargingIcon: google.maps.Icon = {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(evChargingIconSvg)}`,
  scaledSize: { width: 32, height: 32 } as google.maps.Size,
  anchor: { x: 16, y: 16 } as google.maps.Point,
};

const garageCircleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
  <circle cx="11" cy="11" r="9" fill="#2563eb" stroke="#fff" stroke-width="2"/>
</svg>`;

const garageIcon: google.maps.Icon = {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(garageCircleSvg)}`,
  scaledSize: { width: 22, height: 22 } as google.maps.Size,
  anchor: { x: 11, y: 11 } as google.maps.Point,
};

type Props = {
  locations: ParkingLocation[];
  evStations: EvChargingStation[];
  showEvCharging: boolean;
  destination: { lat: number; lng: number } | null;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  selectedEvId: string | null;
  setSelectedEvId: (id: string | null) => void;
  onMapReady: (map: google.maps.Map) => void;
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
  evConnectorsLabel: string;
  evTypeLabel: string;
  evUnknownConnectors: string;
  evUnknownType: string;
  parkingPriceLabels: { free: string; paidUnknown: string; priceLineSeparator: string };
};

export function ZagrebMapCanvas({
  locations,
  evStations,
  showEvCharging,
  destination,
  selectedId,
  setSelectedId,
  selectedEvId,
  setSelectedEvId,
  onMapReady,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
  parkingPriceLabels,
  evConnectorsLabel,
  evTypeLabel,
  evUnknownConnectors,
  evUnknownType,
}: Props) {
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const fitBounds = useCallback(
    (map: google.maps.Map) => {
      const hasGarages = locations.length > 0;
      const hasEv = showEvCharging && evStations.length > 0;
      if (!hasGarages && !hasEv) return;
      const bounds = new google.maps.LatLngBounds();
      for (const l of locations) {
        bounds.extend({ lat: l.lat, lng: l.lng });
      }
      if (showEvCharging) {
        for (const st of evStations) {
          bounds.extend({ lat: st.lat, lng: st.lng });
        }
      }
      map.fitBounds(bounds, 32);
      google.maps.event.addListenerOnce(map, "idle", () => {
        const z = map.getZoom();
        if (z !== undefined && z > 14) {
          map.setZoom(14);
        }
      });
    },
    [locations, evStations, showEvCharging]
  );

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapInstanceRef.current = map;
      onMapReady(map);
      fitBounds(map);
    },
    [fitBounds, onMapReady]
  );

  useEffect(() => {
    if (destination) return;
    const map = mapInstanceRef.current;
    if (!map) return;
    fitBounds(map);
  }, [fitBounds, locations, evStations, destination]);

  const selected = selectedId ? locations.find((l) => l.id === selectedId) : undefined;
  const selectedEv = selectedEvId ? evStations.find((s) => s.id === selectedEvId) : undefined;

  const connectorCountLabel =
    selectedEv?.connectorCount != null ? String(selectedEv.connectorCount) : evUnknownConnectors;
  const connectorTypeLabel = selectedEv?.connectorType?.trim() ? selectedEv.connectorType : evUnknownType;

  return (
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
          icon={garageIcon}
          zIndex={loc.id === selectedId ? 50 : 1}
          onClick={() => {
            setSelectedEvId(null);
            setSelectedId(loc.id === selectedId ? null : loc.id);
          }}
        />
      ))}
      {showEvCharging
        ? evStations.map((s) => (
        <Marker
          key={s.id}
          position={{ lat: s.lat, lng: s.lng }}
          icon={evChargingIcon}
          onClick={() => {
            setSelectedId(null);
            setSelectedEvId(s.id === selectedEvId ? null : s.id);
          }}
        />
        ))
        : null}
      {destination ? <Marker position={destination} icon={destinationIcon} zIndex={1000} /> : null}
      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelectedId(null)}
        >
          <div className="min-w-[240px] max-w-[280px] overflow-hidden rounded-lg border border-emerald-200/90 bg-white text-sm text-zinc-900 shadow-sm dark:border-emerald-800/60 dark:bg-zinc-950">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-2.5">
              <p className="font-semibold leading-snug text-white">{selected.name}</p>
            </div>
            <div className="space-y-2.5 px-3 py-3">
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">{selected.address}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200">
                  {selected.freeCount} {freeSpotsLabel}
                </span>
                {selected.capacity != null ? (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {capacityLabel}: {selected.capacity}
                  </span>
                ) : null}
              </div>
              <p className="border-t border-zinc-100 pt-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                {mockEstimateNote}
              </p>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {!isPlaceholderDistance(selected.distanceLabel) ? (
                  <>
                    {selected.distanceLabel}
                    <span className="mx-1.5 font-normal text-zinc-400 dark:text-zinc-500" aria-hidden>
                      ·
                    </span>
                  </>
                ) : null}
                {formatGaragePriceLine(selected.pricePerHour, selected.pricePerDay, {
                  free: parkingPriceLabels.free,
                  paidUnknown: parkingPriceLabels.paidUnknown,
                  priceLineSeparator: parkingPriceLabels.priceLineSeparator,
                })}
              </p>
            </div>
          </div>
        </InfoWindow>
      ) : null}
      {showEvCharging && selectedEv ? (
        <InfoWindow
          position={{ lat: selectedEv.lat, lng: selectedEv.lng }}
          onCloseClick={() => setSelectedEvId(null)}
        >
          <div className="min-w-[220px] max-w-[260px] overflow-hidden rounded-lg border border-emerald-200/90 bg-white text-sm text-zinc-900 shadow-sm dark:border-emerald-800/50 dark:bg-zinc-950">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-2.5">
              <p className="font-semibold leading-snug text-white">{selectedEv.name}</p>
            </div>
            <div className="space-y-2 px-3 py-3">
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">{selectedEv.address}</p>
              <dl className="grid gap-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-500 dark:text-zinc-400">{evConnectorsLabel}</dt>
                  <dd className="font-medium text-zinc-800 dark:text-zinc-200">{connectorCountLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-500 dark:text-zinc-400">{evTypeLabel}</dt>
                  <dd className="font-medium text-zinc-800 dark:text-zinc-200">{connectorTypeLabel}</dd>
                </div>
              </dl>
            </div>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
