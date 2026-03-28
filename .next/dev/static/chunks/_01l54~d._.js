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
const defaultCenter = {
    lat: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$parking$2d$spaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZAGREB_CENTER"][0],
    lng: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$parking$2d$spaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZAGREB_CENTER"][1]
};
const mapContainerClassName = "zagreb-map z-0 h-[min(56vh,420px)] w-full min-h-[240px] rounded-2xl sm:h-[min(50vh,480px)] sm:min-h-[280px]";
const mapOptions = {
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true
};
function ZagrebMap({ locations, freeSpotsLabel, capacityLabel, mockEstimateNote, missingApiKeyMessage }) {
    _s();
    const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
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
        }
    }["ZagrebMap.useCallback[onMapLoad]"], [
        fitBounds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ZagrebMap.useEffect": ()=>{
            const map = mapRef.current;
            if (!map) return;
            fitBounds(map);
        }
    }["ZagrebMap.useEffect"], [
        fitBounds,
        locations
    ]);
    if (!apiKey) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${mapContainerClassName} flex items-center justify-center border border-dashed border-zinc-300 bg-zinc-50 px-4 text-center text-sm text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-400`,
            role: "status",
            children: missingApiKeyMessage
        }, void 0, false, {
            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this);
    }
    const selected = selectedId ? locations.find((l)=>l.id === selectedId) : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadScript"], {
        googleMapsApiKey: apiKey,
        loadingElement: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: mapContainerClassName,
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
            lineNumber: 83,
            columnNumber: 59
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleMap"], {
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
                        lineNumber: 92,
                        columnNumber: 11
                    }, this)),
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
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-zinc-600",
                                children: selected.address
                            }, void 0, false, {
                                fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                lineNumber: 105,
                                columnNumber: 15
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
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-zinc-500",
                                children: mockEstimateNote
                            }, void 0, false, {
                                fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                                lineNumber: 115,
                                columnNumber: 15
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
                                lineNumber: 117,
                                columnNumber: 17
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/landing/ZagrebMap.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/landing/ZagrebMap.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/landing/ZagrebMap.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(ZagrebMap, "zVc/u/jAMORUL1BkpFa7WfaCKxE=");
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