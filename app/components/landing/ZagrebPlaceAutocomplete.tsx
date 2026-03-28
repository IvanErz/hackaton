"use client";

import { ZAGREB_CENTER } from "@/lib/mock-parking-spaces";
import {
  type GmpSelectEvent,
  latLngFromPlaceLocation,
  type PlaceAutocompleteWidget,
} from "./zagreb-map-shared";
import { useEffect, useRef, type MutableRefObject } from "react";

const HOST_CLASS =
  "zagreb-place-autocomplete-host rounded-xl border border-zinc-200 bg-white px-1 py-0.5 shadow-sm transition-[box-shadow] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-emerald-500";

export type ZagrebPlaceAutocompleteProps = {
  scriptReady: boolean;
  apiKey: string;
  elementId: string;
  placeholder: string;
  ariaLabel: string;
  /** Called when the user picks a suggestion (after place details load). */
  onPlaceSelected: (coords: { lat: number; lng: number }, displayName?: string | null) => void;
  /** Fired when the widget text changes (typing or programmatic update). */
  onTextChange?: (text: string) => void;
  /** Optional ref to the mounted widget for reading current text on submit. */
  widgetRef?: MutableRefObject<PlaceAutocompleteWidget | null>;
  className?: string;
};

/** Read current text from a mounted `PlaceAutocompleteElement` (for form submit). */
export function readZagrebPlaceAutocompleteValue(el: HTMLElement | null | undefined): string {
  if (!el) return "";
  const v = (el as unknown as { value?: string }).value;
  return typeof v === "string" ? v : "";
}

export function ZagrebPlaceAutocomplete({
  scriptReady,
  apiKey,
  elementId,
  placeholder,
  ariaLabel,
  onPlaceSelected,
  onTextChange,
  widgetRef: widgetRefProp,
  className,
}: ZagrebPlaceAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scriptReady || !apiKey) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const elRef: { current: PlaceAutocompleteWidget | null } = { current: null };

    const onGmpSelect = async (ev: Event) => {
      const { placePrediction } = ev as GmpSelectEvent;
      if (!placePrediction) return;
      const place = placePrediction.toPlace();
      await place.fetchFields({ fields: ["location", "displayName"] });
      if (cancelled) return;
      const coords = latLngFromPlaceLocation(place.location);
      if (!coords) return;
      const dn = place.displayName;
      const displayName = typeof dn === "string" ? dn : null;
      onPlaceSelected(coords, displayName);
    };

    const onInput = () => {
      if (!elRef.current || !onTextChange) return;
      onTextChange(readZagrebPlaceAutocompleteValue(elRef.current));
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
      el.id = elementId;
      el.placeholder = placeholder;
      el.setAttribute("aria-label", ariaLabel);
      if (cancelled || !container) return;
      el.addEventListener("gmp-select", onGmpSelect as EventListener);
      if (onTextChange) {
        el.addEventListener("input", onInput);
      }
      container.appendChild(el);
      elRef.current = el;
      if (widgetRefProp) widgetRefProp.current = el;
    })();

    return () => {
      cancelled = true;
      if (widgetRefProp) widgetRefProp.current = null;
      if (elRef.current) {
        elRef.current.removeEventListener("gmp-select", onGmpSelect as EventListener);
        elRef.current.removeEventListener("input", onInput);
        elRef.current.remove();
        elRef.current = null;
      }
      container.replaceChildren();
    };
  }, [
    scriptReady,
    apiKey,
    elementId,
    placeholder,
    ariaLabel,
    onPlaceSelected,
    onTextChange,
    widgetRefProp,
  ]);

  return <div ref={containerRef} className={className ?? HOST_CLASS} />;
}
