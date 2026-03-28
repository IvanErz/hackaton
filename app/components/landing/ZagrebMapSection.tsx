"use client";

import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Libraries } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { DestinationSearchPanel } from "./DestinationSearchPanel";
import { mapContainerClassName, ZagrebMapCanvas } from "./ZagrebMapCanvas";

const MAP_SCRIPT_LIBRARIES = [] as const satisfies Libraries;

type Props = {
  locations: ParkingLocation[];
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
  missingApiKeyMessage: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searchHelper: string;
  nearestTitle: string;
  nearestHint: string;
  distanceMeters: string;
  distanceKilometers: string;
};

export function ZagrebMapSection({
  locations,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
  missingApiKeyMessage,
  searchLabel,
  searchPlaceholder,
  searchAriaLabel,
  searchHelper,
  nearestTitle,
  nearestHint,
  distanceMeters,
  distanceKilometers,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapRef = useRef<google.maps.Map | null>(null);
  const destinationRef = useRef<{ lat: number; lng: number } | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);

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
  }, []);

  const focusGarage = useCallback((loc: ParkingLocation) => {
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
            destination={destination}
            onDestinationSelected={handleDestinationSelected}
            onFocusGarage={focusGarage}
            searchLabel={searchLabel}
            searchPlaceholder={searchPlaceholder}
            searchAriaLabel={searchAriaLabel}
            searchHelper={searchHelper}
            nearestTitle={nearestTitle}
            nearestHint={nearestHint}
            distanceMeters={distanceMeters}
            distanceKilometers={distanceKilometers}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm ring-1 ring-zinc-200/60 dark:border-zinc-800 dark:ring-zinc-800/80">
          <ZagrebMapCanvas
            locations={locations}
            destination={destination}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onMapReady={onMapReady}
            freeSpotsLabel={freeSpotsLabel}
            capacityLabel={capacityLabel}
            mockEstimateNote={mockEstimateNote}
          />
        </div>
      </div>
    </LoadScript>
  );
}
