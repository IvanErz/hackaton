"use client";

import { ZAGREB_CENTER, type ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Libraries } from "@react-google-maps/api";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Avoid passing a new array each render (LoadScript performance warning). Omit legacy `libraries=places` URL param; load Places via `importLibrary` for PlaceAutocompleteElement. */
const MAP_SCRIPT_LIBRARIES = [] as const satisfies Libraries;

const defaultCenter = { lat: ZAGREB_CENTER[0], lng: ZAGREB_CENTER[1] };

const mapContainerClassName =
  "zagreb-map z-0 h-[min(56vh,420px)] w-full min-h-[240px] rounded-b-2xl sm:h-[min(50vh,480px)] sm:min-h-[280px]";

const mapOptions: google.maps.MapOptions = {
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
};

const NEAREST_COUNT = 5;

const destinationIcon: google.maps.Icon = {
  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const s =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

function formatDistance(meters: number, mLabel: string, kmLabel: string): string {
  if (meters < 1000) {
    return `${Math.round(meters)} ${mLabel}`;
  }
  return `${(meters / 1000).toFixed(1)} ${kmLabel}`;
}

function latLngFromPlaceLocation(
  loc: google.maps.LatLng | google.maps.LatLngLiteral | undefined | null
): { lat: number; lng: number } | null {
  if (loc == null) return null;
  if (typeof (loc as google.maps.LatLng).lat === "function") {
    const l = loc as google.maps.LatLng;
    return { lat: l.lat(), lng: l.lng() };
  }
  const literal = loc as google.maps.LatLngLiteral;
  return { lat: literal.lat, lng: literal.lng };
}

/** gmp-select event shape (Place Autocomplete widget); not fully modeled in @types/google.maps. */
type GmpSelectEvent = Event & {
  placePrediction: { toPlace: () => google.maps.places.Place };
};

/** @types/google.maps lags PlaceAutocompleteElement widget properties. */
type PlaceAutocompleteWidget = google.maps.places.PlaceAutocompleteElement & {
  placeholder?: string;
  includedRegionCodes?: string[];
};

type Props = {
  locations: ParkingLocation[];
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
  missingApiKeyMessage: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  nearestTitle: string;
  nearestHint: string;
  distanceMeters: string;
  distanceKilometers: string;
};

export function ZagrebMap({
  locations,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
  missingApiKeyMessage,
  searchLabel,
  searchPlaceholder,
  searchAriaLabel,
  nearestTitle,
  nearestHint,
  distanceMeters,
  distanceKilometers,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);

  const nearestGarages = useMemo(() => {
    if (!destination) return [];
    return [...locations]
      .map((loc) => ({
        loc,
        d: haversineMeters(destination.lat, destination.lng, loc.lat, loc.lng),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, NEAREST_COUNT);
  }, [destination, locations]);

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
      setMapLoaded(true);
    },
    [fitBounds]
  );

  useEffect(() => {
    if (destination) return;
    const map = mapRef.current;
    if (!map) return;
    fitBounds(map);
  }, [fitBounds, locations, destination]);

  useEffect(() => {
    if (!mapLoaded || !apiKey) return;
    const container = autocompleteContainerRef.current;
    if (!container) return;

    let cancelled = false;
    const elRef: { current: google.maps.places.PlaceAutocompleteElement | null } = { current: null };

    const onGmpSelect = async (ev: Event) => {
      const { placePrediction } = ev as GmpSelectEvent;
      if (!placePrediction) return;
      const map = mapRef.current;
      if (!map) return;
      const place = placePrediction.toPlace();
      await place.fetchFields({ fields: ["location", "displayName"] });
      if (cancelled) return;
      const coords = latLngFromPlaceLocation(place.location);
      if (!coords) return;
      setDestination(coords);
      setSelectedId(null);
      map.panTo(coords);
      map.setZoom(15);
    };

    void (async () => {
      try {
        await google.maps.importLibrary("places");
      } catch (e) {
        console.error("Google Maps Places library failed to load", e);
        return;
      }
      if (cancelled || !container) return;

      const Ctor = google.maps.places.PlaceAutocompleteElement;
      if (!Ctor) {
        console.error("PlaceAutocompleteElement is not available");
        return;
      }

      container.replaceChildren();
      const el = new Ctor({}) as PlaceAutocompleteWidget;
      el.includedRegionCodes = ["hr"];
      el.id = "zagreb-destination-search";
      el.placeholder = searchPlaceholder;
      el.setAttribute("aria-label", searchAriaLabel);
      if (cancelled || !container) return;
      el.addEventListener("gmp-select", onGmpSelect as EventListener);
      container.appendChild(el);
      elRef.current = el;
    })();

    return () => {
      cancelled = true;
      if (elRef.current) {
        elRef.current.removeEventListener("gmp-select", onGmpSelect as EventListener);
        elRef.current.remove();
        elRef.current = null;
      }
      container.replaceChildren();
    };
  }, [mapLoaded, apiKey, searchPlaceholder, searchAriaLabel]);

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

  const selected = selectedId ? locations.find((l) => l.id === selectedId) : undefined;

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={MAP_SCRIPT_LIBRARIES}
      loadingElement={<div className={mapContainerClassName} aria-hidden />}
    >
      <div className="flex flex-col">
        <div className="border-b border-zinc-200 bg-zinc-50/80 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-4">
          <label htmlFor="zagreb-destination-search" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {searchLabel}
          </label>
          <div ref={autocompleteContainerRef} className="zagreb-place-autocomplete-host mt-1.5" />
          {nearestGarages.length > 0 ? (
            <div className="mt-3">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{nearestTitle}</p>
              <ul className="mt-2 flex max-h-36 flex-col gap-1 overflow-y-auto">
                {nearestGarages.map(({ loc, d }) => (
                  <li key={loc.id}>
                    <button
                      type="button"
                      onClick={() => focusGarage(loc)}
                      className="flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left text-sm text-foreground transition hover:border-zinc-200 hover:bg-white dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      <span className="min-w-0 truncate font-medium">{loc.name}</span>
                      <span className="shrink-0 tabular-nums text-xs text-zinc-500">
                        {formatDistance(d, distanceMeters, distanceKilometers)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : !destination ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">{nearestHint}</p>
          ) : null}
        </div>
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
          {destination ? (
            <Marker position={destination} icon={destinationIcon} zIndex={1000} />
          ) : null}
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
      </div>
    </LoadScript>
  );
}
