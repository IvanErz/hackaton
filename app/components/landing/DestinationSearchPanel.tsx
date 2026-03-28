"use client";

import type { EvChargingStation } from "@/lib/ev-charging-stations";
import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import { ZAGREB_CENTER } from "@/lib/mock-parking-spaces";
import { formatGaragePriceLine } from "@/lib/parking-price-display";
import {
  formatDistance,
  googleMapsDirectionsFromCurrentLocationUrl,
  type GmpSelectEvent,
  latLngFromPlaceLocation,
  nearestEvForDestination,
  nearestGaragesForDestination,
  type PlaceAutocompleteWidget,
  TOP_GARAGES_FOR_DIRECTIONS,
} from "./zagreb-map-shared";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  scriptReady: boolean;
  apiKey: string;
  locations: ParkingLocation[];
  evStations: EvChargingStation[];
  destination: { lat: number; lng: number } | null;
  onDestinationSelected: (coords: { lat: number; lng: number }) => void;
  onFocusGarage: (loc: ParkingLocation) => void;
  onFocusEvStation: (station: EvChargingStation) => void;
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
  showEvCharging: boolean;
  directionsFromHereLabel: string;
  bestParkingTitle: string;
  fromDestinationLabel: string;
  directionsToBestGarageLabel: string;
  parkingPriceLabels: { free: string; paidUnknown: string; priceLineSeparator: string };
};

export function DestinationSearchPanel({
  scriptReady,
  apiKey,
  locations,
  evStations,
  destination,
  onDestinationSelected,
  onFocusGarage,
  onFocusEvStation,
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
  showEvCharging,
  directionsFromHereLabel,
  bestParkingTitle,
  fromDestinationLabel,
  directionsToBestGarageLabel,
  parkingPriceLabels,
}: Props) {
  const autocompleteContainerRef = useRef<HTMLDivElement | null>(null);

  const nearestGarages = useMemo(
    () => nearestGaragesForDestination(locations, destination),
    [locations, destination]
  );

  const nearestEv = useMemo(
    () => nearestEvForDestination(evStations, destination),
    [evStations, destination]
  );

  useEffect(() => {
    if (!scriptReady || !apiKey) return;
    const container = autocompleteContainerRef.current;
    if (!container) return;

    let cancelled = false;
    const elRef: { current: google.maps.places.PlaceAutocompleteElement | null } = { current: null };

    const onGmpSelect = async (ev: Event) => {
      const { placePrediction } = ev as GmpSelectEvent;
      if (!placePrediction) return;
      const place = placePrediction.toPlace();
      await place.fetchFields({ fields: ["location", "displayName"] });
      if (cancelled) return;
      const coords = latLngFromPlaceLocation(place.location);
      if (!coords) return;
      onDestinationSelected(coords);
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
      el.locationBias = {
        center: { lat: ZAGREB_CENTER[0], lng: ZAGREB_CENTER[1] },
        radius: 45000,
      };
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
  }, [scriptReady, apiKey, searchPlaceholder, searchAriaLabel, onDestinationSelected]);

  const showHint = !destination;
  const topForRoutes = useMemo(
    () => nearestGarages.slice(0, TOP_GARAGES_FOR_DIRECTIONS),
    [nearestGarages]
  );

  return (
    <div className="space-y-3">
      <fieldset className="min-w-0">
        <legend className="sr-only">{searchLabel}</legend>
        <label
          htmlFor="zagreb-destination-search"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {searchLabel}
        </label>
        <div
          ref={autocompleteContainerRef}
          className="zagreb-place-autocomplete-host rounded-xl border border-zinc-200 bg-white px-1 py-0.5 shadow-sm transition-[box-shadow] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-emerald-500"
        />
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{searchHelper}</p>
        {destination && topForRoutes.length > 0 ? (
          <div className="mt-3 rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-3 dark:border-emerald-800/60 dark:bg-emerald-950/30">
            <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200">{bestParkingTitle}</p>
            <ul className="mt-2 space-y-3">
              {topForRoutes.map(({ loc, d }, i) => (
                <li
                  key={loc.id}
                  className={
                    i > 0
                      ? "border-t border-emerald-200/70 pt-3 dark:border-emerald-800/50"
                      : undefined
                  }
                >
                  <p className="text-sm font-semibold text-foreground">{loc.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {formatDistance(d, distanceMeters, distanceKilometers)} {fromDestinationLabel}
                  </p>
                  <p className="mt-0.5 text-xs font-medium tabular-nums text-zinc-700 dark:text-zinc-300">
                    {formatGaragePriceLine(loc.pricePerHour, loc.pricePerDay, {
                      free: parkingPriceLabels.free,
                      paidUnknown: parkingPriceLabels.paidUnknown,
                      priceLineSeparator: parkingPriceLabels.priceLineSeparator,
                    })}
                  </p>
                  <a
                    href={googleMapsDirectionsFromCurrentLocationUrl({
                      lat: loc.lat,
                      lng: loc.lng,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-emerald-600 underline decoration-emerald-600/40 underline-offset-2 transition hover:text-emerald-700 hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/50 dark:hover:text-emerald-300"
                  >
                    {directionsToBestGarageLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : destination ? (
          <p className="mt-2">
            <a
              href={googleMapsDirectionsFromCurrentLocationUrl(destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-emerald-600 underline decoration-emerald-600/40 underline-offset-2 transition hover:text-emerald-700 hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/50 dark:hover:text-emerald-300"
            >
              {directionsFromHereLabel}
            </a>
          </p>
        ) : null}
      </fieldset>

      {nearestGarages.length > 0 ? (
        <div>
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{nearestTitle}</p>
          <ul className="mt-2 flex max-h-40 flex-col gap-1 overflow-y-auto sm:max-h-48">
            {nearestGarages.map(({ loc, d }) => (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => onFocusGarage(loc)}
                  className="flex min-h-11 w-full flex-col items-stretch gap-0.5 rounded-xl border border-transparent px-3 py-2 text-left text-base text-foreground transition hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80 sm:text-sm"
                >
                  <span className="flex min-w-0 items-center justify-between gap-2">
                    <span className="min-w-0 truncate font-medium">{loc.name}</span>
                    <span className="shrink-0 tabular-nums text-xs text-zinc-500">
                      {formatDistance(d, distanceMeters, distanceKilometers)}
                    </span>
                  </span>
                  <span className="truncate text-xs tabular-nums text-zinc-500">
                    {formatGaragePriceLine(loc.pricePerHour, loc.pricePerDay, {
                      free: parkingPriceLabels.free,
                      paidUnknown: parkingPriceLabels.paidUnknown,
                      priceLineSeparator: parkingPriceLabels.priceLineSeparator,
                    })}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {showEvCharging && nearestEv.length > 0 ? (
        <div>
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{nearestEvTitle}</p>
          <ul className="mt-2 flex max-h-40 flex-col gap-1 overflow-y-auto sm:max-h-48">
            {nearestEv.map(({ station, d }) => {
              const countPart =
                station.connectorCount != null ? String(station.connectorCount) : evUnknownConnectors;
              const typePart =
                station.connectorType?.trim() ? station.connectorType : evUnknownType;
              const subtitle = `${evConnectorsLabel}: ${countPart} · ${evTypeLabel}: ${typePart}`;
              return (
                <li key={station.id}>
                  <button
                    type="button"
                    onClick={() => onFocusEvStation(station)}
                    className="flex min-h-11 w-full flex-col items-stretch gap-0.5 rounded-xl border border-transparent px-3 py-2 text-left text-base text-foreground transition hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80 sm:text-sm"
                  >
                    <span className="flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 truncate font-medium">{station.name}</span>
                      <span className="shrink-0 tabular-nums text-xs text-zinc-500">
                        {formatDistance(d, distanceMeters, distanceKilometers)}
                      </span>
                    </span>
                    <span className="truncate text-xs text-zinc-500">{subtitle}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {showHint && nearestGarages.length === 0 && (!showEvCharging || nearestEv.length === 0) ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">{nearestHint}</p>
      ) : null}
    </div>
  );
}
