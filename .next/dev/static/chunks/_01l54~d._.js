(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/mock-parking-spaces.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZAGREB_CENTER",
    ()=>ZAGREB_CENTER
]);
const ZAGREB_CENTER = [
    45.815,
    15.9819
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/landing/ZagrebMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZagrebMap",
    ()=>ZagrebMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$parking$2d$spaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-parking-spaces.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-google-maps/api/dist/esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/** Avoid passing a new array each render (LoadScript performance warning). Omit legacy `libraries=places` URL param; load Places via `importLibrary` for PlaceAutocompleteElement. */ const MAP_SCRIPT_LIBRARIES = [];
const defaultCenter = {
    lat: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$parking$2d$spaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZAGREB_CENTER"][0],
    lng: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$parking$2d$spaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZAGREB_CENTER"][1]
};
const mapContainerClassName = "zagreb-map z-0 h-[min(56vh,420px)] w-full min-h-[240px] rounded-b-2xl sm:h-[min(50vh,480px)] sm:min-h-[280px]";
const mapOptions = {
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true
};
const NEAREST_COUNT = 5;
const destinationIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
};
function haversineMeters(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;
    const s = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}
function formatDistance(meters, mLabel, kmLabel) {
    if (meters < 1000) {
        return `${Math.round(meters)} ${mLabel}`;
    }
    return `${(meters / 1000).toFixed(1)} ${kmLabel}`;
}
function latLngFromPlaceLocation(loc) {
    if (loc == null) return null;
    if (typeof loc.lat === "function") {
        const l = loc;
        return {
            lat: l.lat(),
            lng: l.lng()
        };
    }
    const literal = loc;
    return {
        lat: literal.lat,
        lng: literal.lng
    };
}
function ZagrebMap({ locations, freeSpotsLabel, capacityLabel, mockEstimateNote, missingApiKeyMessage, searchLabel, searchPlaceholder, searchAriaLabel, nearestTitle, nearestHint, distanceMeters, distanceKilometers }) {
    _s();
    const apiKey = ("TURBOPACK compile-time value", "AIzaSyAH17y7U1GEnqXoE40x45DLn48yQ7KAy0I") ?? "";
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autocompleteContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapLoaded, setMapLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [destination, setDestination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const nearestGarages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ZagrebMap.useMemo[nearestGarages]": ()=>{
            if (!destination) return [];
            return [
                ...locations
            ].map({
                "ZagrebMap.useMemo[nearestGarages]": (loc)=>({
                        loc,
                        d: haversineMeters(destination.lat, destination.lng, loc.lat, loc.lng)
                    })
            }["ZagrebMap.useMemo[nearestGarages]"]).sort({
                "ZagrebMap.useMemo[nearestGarages]": (a, b)=>a.d - b.d
            }["ZagrebMap.useMemo[nearestGarages]"]).slice(0, NEAREST_COUNT);
        }
    }["ZagrebMap.useMemo[nearestGarages]"], [
        destination,
        locations
    ]);
    const fitBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ZagrebMap.useCallback[fitBounds]": (map)=>{
            if (locations.length === 0) return;
            const bounds = new google.maps.LatLngBounds();
            for (const l of locations){
                bounds.extend({
                    lat: l.lat,
                    lng: l.lng
                });
            }
            map.fitBounds(bounds, 32);
            google.maps.event.addListenerOnce(map, "idle", {
                "ZagrebMap.useCallback[fitBounds]": ()=>{
                    const z = map.getZoom();
                    if (z !== undefined && z > 14) {
                        map.setZoom(14);
                    }
                }
            }["ZagrebMap.useCallback[fitBounds]"]);
        }
    }["ZagrebMap.useCallback[fitBounds]"], [
        locations
    ]);
    const onMapLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ZagrebMap.useCallback[onMapLoad]": (map)=>{
            mapRef.current = map;
            fitBounds(map);
            setMapLoaded(true);
        }
    }["ZagrebMap.useCallback[onMapLoad]"], [
        fitBounds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ZagrebMap.useEffect": ()=>{
            if (destination) return;
            const map = mapRef.current;
            if (!map) return;
            fitBounds(map);
        }
    }["ZagrebMap.useEffect"], [
        fitBounds,
        locations,
        destination
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ZagrebMap.useEffect": ()=>{
            if (!mapLoaded || !apiKey) return;
            const container = autocompleteContainerRef.current;
            if (!container) return;
            let cancelled = false;
            const elRef = {
                current: null
            };
            const onGmpSelect = {
                "ZagrebMap.useEffect.onGmpSelect": async (ev)=>{
                    const { placePrediction } = ev;
                    if (!placePrediction) return;
                    const map = mapRef.current;
                    if (!map) return;
                    const place = placePrediction.toPlace();
                    await place.fetchFields({
                        fields: [
                            "location",
                            "displayName"
                        ]
                    });
                    if (cancelled) return;
                    const coords = latLngFromPlaceLocation(place.location);
                    if (!coords) return;
                    setDestination(coords);
                    setSelectedId(null);
                    map.panTo(coords);
                    map.setZoom(15);
                }
            }["ZagrebMap.useEffect.onGmpSelect"];
            void ({
                "ZagrebMap.useEffect": async ()=>{
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
                    const el = new Ctor({});
                    el.includedRegionCodes = [
                        "hr"
                    ];
                    el.id = "zagreb-destination-search";
                    el.placeholder = searchPlaceholder;
                    el.setAttribute("aria-label", searchAriaLabel);
                    if (cancelled || !container) return;
                    el.addEventListener("gmp-select", onGmpSelect);
                    container.appendChild(el);
                    elRef.current = el;
                }
            })["ZagrebMap.useEffect"]();
            return ({
                "ZagrebMap.useEffect": ()=>{
                    cancelled = true;
                    if (elRef.current) {
                        elRef.current.removeEventListener("gmp-select", onGmpSelect);
                        elRef.current.remove();
                        elRef.current = null;
                    }
                    container.replaceChildren();
                }
            })["ZagrebMap.useEffect"];
        }
    }["ZagrebMap.useEffect"], [
        mapLoaded,
        apiKey,
        searchPlaceholder,
        searchAriaLabel
    ]);
    const focusGarage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ZagrebMap.useCallback[focusGarage]": (loc)=>{
            setSelectedId(loc.id);
            const map = mapRef.current;
            if (map) {
                map.panTo({
                    lat: loc.lat,
                    lng: loc.lng
                });
                const z = map.getZoom();
                if (z === undefined || z < 15) {
                    map.setZoom(16);
                }
            }
        }
    }["ZagrebMap.useCallback[focusGarage]"], []);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const selected = selectedId ? locations.find((l)=>l.id === selectedId) : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadScript"], {
        googleMapsApiKey: apiKey,
        libraries: MAP_SCRIPT_LIBRARIES,
        loadingElement: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: mapContainerClassName,
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
            lineNumber: 242,
            columnNumber: 23
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b border-zinc-200 bg-zinc-50/80 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "zagreb-destination-search",
                            className: "text-xs font-medium text-zinc-600 dark:text-zinc-400",
                            children: searchLabel
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: autocompleteContainerRef,
                            className: "zagreb-place-autocomplete-host mt-1.5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, this),
                        nearestGarages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                    children: nearestTitle
                                }, void 0, false, {
                                    fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-2 flex max-h-36 flex-col gap-1 overflow-y-auto",
                                    children: nearestGarages.map(({ loc, d })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>focusGarage(loc),
                                                className: "flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left text-sm text-foreground transition hover:border-zinc-200 hover:bg-white dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 truncate font-medium",
                                                        children: loc.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 tabular-nums text-xs text-zinc-500",
                                                        children: formatDistance(d, distanceMeters, distanceKilometers)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                                lineNumber: 256,
                                                columnNumber: 21
                                            }, this)
                                        }, loc.id, false, {
                                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                            lineNumber: 255,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                            lineNumber: 251,
                            columnNumber: 13
                        }, this) : !destination ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xs text-zinc-500 dark:text-zinc-500",
                            children: nearestHint
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleMap"], {
                    mapContainerClassName: mapContainerClassName,
                    center: defaultCenter,
                    zoom: 12,
                    onLoad: onMapLoad,
                    options: mapOptions,
                    children: [
                        locations.map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                                position: {
                                    lat: loc.lat,
                                    lng: loc.lng
                                },
                                onClick: ()=>setSelectedId(loc.id === selectedId ? null : loc.id)
                            }, loc.id, false, {
                                fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this)),
                        destination ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                            position: destination,
                            icon: destinationIcon,
                            zIndex: 1000
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this) : null,
                        selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InfoWindow"], {
                            position: {
                                lat: selected.lat,
                                lng: selected.lng
                            },
                            onCloseClick: ()=>setSelectedId(null),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[220px] text-sm text-zinc-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: selected.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                        lineNumber: 297,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-zinc-600",
                                        children: selected.address
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                        lineNumber: 298,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2",
                                        children: [
                                            selected.freeCount,
                                            " ",
                                            freeSpotsLabel,
                                            selected.capacity != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    " ",
                                                    "· ",
                                                    capacityLabel,
                                                    ": ",
                                                    selected.capacity
                                                ]
                                            }, void 0, true) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-zinc-500",
                                        children: mockEstimateNote
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this),
                                    selected.pricePerHour !== "—" || selected.distanceLabel !== "—" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-zinc-600",
                                        children: [
                                            selected.pricePerHour,
                                            " · ",
                                            selected.distanceLabel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                        lineNumber: 310,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                lineNumber: 296,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
            lineNumber: 244,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_s(ZagrebMap, "Sw7kdEszFLIxDAzusT9GyS45/OU=");
_c = ZagrebMap;
var _c;
__turbopack_context__.k.register(_c, "ZagrebMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/landing/ZagrebMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/components/landing/ZagrebMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_01l54~d._.js.map