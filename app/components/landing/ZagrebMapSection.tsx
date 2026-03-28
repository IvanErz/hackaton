"use client";

import type { EvChargingStation } from "@/lib/ev-charging-stations";
import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Libraries } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { DestinationSearchPanel } from "./DestinationSearchPanel";
import { mapContainerClassName, ZagrebMapCanvas } from "./ZagrebMapCanvas";

const MAP_SCRIPT_LIBRARIES = [] as const satisfies Libraries;

type Props = {
  locations: ParkingLocation[];
  evStations: EvChargingStation[];
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
  missingApiKeyMessage: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searchHelper: string;
  nearestTitle: string;
  nearestEvTitle: string;
  nearestHint: string;
  distanceMeters: string;
  distanceKilometers: string;
  evConnectorsLabel: string;
  evTypeLabel: string;
  evUnknownConnectors: string;
  evUnknownType: string;
  showEvChargingLabel: string;
};

export function ZagrebMapSection({
  locations,
  evStations,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
  missingApiKeyMessage,
  searchLabel,
  searchPlaceholder,
  searchAriaLabel,
  searchHelper,
  nearestTitle,
  nearestEvTitle,
  nearestHint,
  distanceMeters,
  distanceKilometers,
  evConnectorsLabel,
  evTypeLabel,
  evUnknownConnectors,
  evUnknownType,
  showEvChargingLabel,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapRef = useRef<google.maps.Map | null>(null);
  const destinationRef = useRef<{ lat: number; lng: number } | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedEvId, setSelectedEvId] = useState<string | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [showEvCharging, setShowEvCharging] = useState(true);

  destinationRef.current = destination;

  const onMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const d = destinationRef.current;
    if (d) {
      map.panTo(d);
      map.setZoom(15);
    }
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !destination) return;
    map.panTo(destination);
    map.setZoom(15);
  }, [destination]);

  const handleDestinationSelected = useCallback((coords: { lat: number; lng: number }) => {
    setDestination(coords);
    setSelectedId(null);
    setSelectedEvId(null);
  }, []);

  const focusGarage = useCallback((loc: ParkingLocation) => {
    setSelectedEvId(null);
    setSelectedId(loc.id);
    const map = mapRef.current;
    if (map) {
      map.panTo({ lat: loc.lat, lng: loc.lng });
      const z = map.getZoom();
      if (z === undefined || z < 15) {
        map.setZoom(16);
      }
    }
  }, []);

  const focusEvStation = useCallback((station: EvChargingStation) => {
    setSelectedId(null);
    setSelectedEvId(station.id);
    const map = mapRef.current;
    if (map) {
      map.panTo({ lat: station.lat, lng: station.lng });
      const z = map.getZoom();
      if (z === undefined || z < 15) {
        map.setZoom(16);
      }
    }
  }, []);

  if (!apiKey) {
    return (
      <div
        className={`${mapContainerClassName} flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 text-center text-sm text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-400`}
        role="status"
      >
        {missingApiKeyMessage}
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={MAP_SCRIPT_LIBRARIES}
      onLoad={() => setScriptReady(true)}
      loadingElement={<div className={`${mapContainerClassName} rounded-2xl`} aria-hidden />}
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/90 p-4 shadow-sm ring-1 ring-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900/50 dark:ring-zinc-800/80 sm:p-5">
          <DestinationSearchPanel
            scriptReady={scriptReady}
            apiKey={apiKey}
            locations={locations}
            evStations={evStations}
            showEvCharging={showEvCharging}
            destination={destination}
            onDestinationSelected={handleDestinationSelected}
            onFocusGarage={focusGarage}
            onFocusEvStation={focusEvStation}
            searchLabel={searchLabel}
            searchPlaceholder={searchPlaceholder}
            searchAriaLabel={searchAriaLabel}
            searchHelper={searchHelper}
            nearestTitle={nearestTitle}
            nearestEvTitle={nearestEvTitle}
            nearestHint={nearestHint}
            distanceMeters={distanceMeters}
            distanceKilometers={distanceKilometers}
            evConnectorsLabel={evConnectorsLabel}
            evTypeLabel={evTypeLabel}
            evUnknownConnectors={evUnknownConnectors}
            evUnknownType={evUnknownType}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm ring-1 ring-zinc-200/60 dark:border-zinc-800 dark:ring-zinc-800/80">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50/95 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/85">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{showEvChargingLabel}</span>
            <button
              type="button"
              role="switch"
              aria-checked={showEvCharging}
              aria-label={showEvChargingLabel}
              onClick={() => {
                setShowEvCharging((on) => {
                  if (on) setSelectedEvId(null);
                  return !on;
                });
              }}
              className={
                "relative inline-flex h-8 w-14 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 " +
                (showEvCharging ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600")
              }
            >
              <span
                className={
                  "pointer-events-none absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white shadow ring-1 ring-black/5 transition-transform duration-200 ease-out dark:ring-white/10 " +
                  (showEvCharging ? "translate-x-6" : "translate-x-0")
                }
              />
            </button>
          </div>
          <ZagrebMapCanvas
            locations={locations}
            evStations={evStations}
            showEvCharging={showEvCharging}
            destination={destination}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            selectedEvId={selectedEvId}
            setSelectedEvId={setSelectedEvId}
            onMapReady={onMapReady}
            freeSpotsLabel={freeSpotsLabel}
            capacityLabel={capacityLabel}
            mockEstimateNote={mockEstimateNote}
            evConnectorsLabel={evConnectorsLabel}
            evTypeLabel={evTypeLabel}
            evUnknownConnectors={evUnknownConnectors}
            evUnknownType={evUnknownType}
          />
        </div>
      </div>
    </LoadScript>
  );
}
