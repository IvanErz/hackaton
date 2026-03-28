"use client";

import { ZagrebPlaceAutocomplete, readZagrebPlaceAutocompleteValue } from "@/app/components/landing/ZagrebPlaceAutocomplete";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ZoneLookupErrorBody, ZoneLookupResponseBody } from "@/lib/zone-lookup-types";
import type { PlaceAutocompleteWidget } from "@/app/components/landing/zagreb-map-shared";
import type { Libraries } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import { useCallback, useRef, useState, type FormEvent } from "react";

const MAP_SCRIPT_LIBRARIES = [] as const satisfies Libraries;

type Props = {
  copy: Dictionary["zonePage"];
};

type Phase = "idle" | "loading" | "result" | "error";

function formatBlockLine(r: ZoneLookupResponseBody): string {
  const { blockId, blockName } = r;
  if (blockId && blockName) return `${blockId} — ${blockName}`;
  return blockId ?? blockName ?? "";
}

export function ZoneLookupView({ copy }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const [scriptReady, setScriptReady] = useState(false);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [validationError, setValidationError] = useState(false);
  const [result, setResult] = useState<ZoneLookupResponseBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const widgetRef = useRef<PlaceAutocompleteWidget | null>(null);

  const handlePlaceSelected = useCallback(
    (c: { lat: number; lng: number }, displayName?: string | null) => {
      setCoords(c);
      if (displayName) setAddress(displayName);
      setValidationError((v) => (v ? false : v));
    },
    []
  );

  const handleTextChange = useCallback((text: string) => {
    setAddress(text);
    setValidationError((v) => (v ? false : v));
  }, []);

  const resolveErrorCopy = useCallback(
    (code: string | undefined) => {
      if (code === "NOT_CONFIGURED") return copy.errorNotConfigured;
      if (code === "BAD_INPUT") return copy.errorBadInput;
      if (code === "MODEL_ERROR") return copy.errorModel;
      return copy.errorGeneric;
    },
    [copy]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const raw =
        apiKey && widgetRef.current
          ? readZagrebPlaceAutocompleteValue(widgetRef.current)
          : address;
      const trimmed = raw.trim();
      if (!trimmed) {
        setValidationError(true);
        return;
      }
      setValidationError(false);
      setPhase("loading");
      setErrorMessage(null);
      setResult(null);

      try {
        const res = await fetch("/api/zone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: trimmed,
            ...(coords ? { lat: coords.lat, lng: coords.lng } : {}),
          }),
        });

        const data: unknown = await res.json().catch(() => null);

        if (!res.ok) {
          const err = data as ZoneLookupErrorBody | null;
          setErrorMessage(resolveErrorCopy(err?.error));
          setPhase("error");
          return;
        }

        setResult(data as ZoneLookupResponseBody);
        setPhase("result");
      } catch {
        setErrorMessage(copy.errorGeneric);
        setPhase("error");
      }
    },
    [apiKey, address, coords, copy.errorGeneric, resolveErrorCopy]
  );

  const formInner = (useAutocomplete: boolean) => (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-zinc-200 bg-background p-5 shadow-sm ring-1 ring-zinc-200/60 dark:border-zinc-800 dark:ring-zinc-800/80 sm:p-6"
    >
      <label htmlFor="zone-address" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {copy.addressLabel}
      </label>
      <div className="mt-2">
        {useAutocomplete ? (
          <ZagrebPlaceAutocomplete
            scriptReady={scriptReady}
            apiKey={apiKey}
            elementId="zone-address"
            placeholder={copy.addressPlaceholder}
            ariaLabel={copy.addressLabel}
            onPlaceSelected={handlePlaceSelected}
            onTextChange={handleTextChange}
            widgetRef={widgetRef}
          />
        ) : (
          <input
            id="zone-address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder={copy.addressPlaceholder}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (validationError) setValidationError(false);
            }}
            aria-invalid={validationError}
            aria-describedby={validationError ? "zone-address-error" : undefined}
            className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-emerald-500"
          />
        )}
      </div>
      {validationError ? (
        <p id="zone-address-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {copy.validationEmpty}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={phase === "loading"}
        className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-600 sm:w-auto"
      >
        {phase === "loading" ? copy.submitLoading : copy.submitButton}
      </button>
    </form>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{copy.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{copy.subtitle}</p>

        {!apiKey ? (
          formInner(false)
        ) : (
          <LoadScript
            googleMapsApiKey={apiKey}
            libraries={MAP_SCRIPT_LIBRARIES}
            onLoad={() => setScriptReady(true)}
            loadingElement={
              <div
                className="mt-8 h-52 w-full rounded-2xl border border-zinc-200 bg-zinc-100/80 animate-pulse dark:border-zinc-800 dark:bg-zinc-800/40"
                aria-hidden
              />
            }
          >
            {formInner(true)}
          </LoadScript>
        )}

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50/40 p-5 shadow-sm ring-1 ring-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950/30 dark:ring-zinc-800/80 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {copy.resultTitle}
          </h2>

          {phase === "idle" ? (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{copy.resultEmpty}</p>
          ) : null}

          {phase === "loading" ? (
            <div className="mt-4 space-y-3" aria-busy="true">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{copy.resultLoading}</p>
              <div className="h-4 w-3/4 max-w-xs animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-1/2 max-w-[12rem] animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ) : null}

          {phase === "error" && errorMessage ? (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {phase === "result" && result ? (
            <div className="mt-4 space-y-4">
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/50">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{copy.zoneLabel}</dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                    {result.majorZone ?? copy.dash}
                  </dd>
                </div>
                <div className="rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/50">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{copy.blockLabel}</dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                    {formatBlockLine(result) || copy.dash}
                  </dd>
                </div>
              </dl>
              <div className="rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/50">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{copy.confidenceLabel}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{copy.confidence[result.confidence]}</p>
              </div>
              {result.note ? (
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{result.note}</p>
              ) : null}
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{copy.backendNote}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
