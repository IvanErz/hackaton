module.exports = [
"[project]/lib/i18n/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOCALE_COOKIE",
    ()=>LOCALE_COOKIE,
    "LOCALE_REQUEST_HEADER",
    ()=>LOCALE_REQUEST_HEADER,
    "defaultLocale",
    ()=>defaultLocale,
    "locales",
    ()=>locales
]);
const locales = [
    "hr",
    "en"
];
const defaultLocale = "hr";
const LOCALE_COOKIE = "parkspot_locale";
const LOCALE_REQUEST_HEADER = "x-parkspot-locale";
}),
"[project]/app/components/LanguageSwitcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageSwitcher",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/config.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function LanguageSwitcher({ currentLocale }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    function setLocale(locale) {
        if (locale === currentLocale) return;
        const maxAge = 60 * 60 * 24 * 365;
        document.cookie = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"]}=${locale};path=/;max-age=${maxAge};SameSite=Lax`;
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-0.5 rounded-full border border-zinc-200 bg-zinc-50/80 p-0.5 text-xs font-semibold dark:border-zinc-700 dark:bg-zinc-900/60",
        role: "group",
        "aria-label": "Language",
        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].map((loc)=>{
            const active = loc === currentLocale;
            const label = loc === "hr" ? "HR" : "EN";
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setLocale(loc),
                "aria-pressed": active,
                className: `min-w-[2.25rem] rounded-full px-2 py-1 transition-colors ${active ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500" : "text-zinc-600 hover:bg-zinc-200/80 hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-800"}`,
                children: label
            }, loc, false, {
                fileName: "[project]/app/components/LanguageSwitcher.tsx",
                lineNumber: 30,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/components/LanguageSwitcher.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/components/landing/ZagrebMapLoader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZagrebMapLoader",
    ()=>ZagrebMapLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
"use client";
;
;
;
function ZagrebMapLoader({ bestParkingTitle, locations, fromDestinationLabel, directionsToBestGarageLabel, evStations, parkingPriceLabels, loadingLabel, freeSpotsLabel, capacityLabel, mockEstimateNote, missingApiKeyMessage, searchLabel, searchPlaceholder, searchAriaLabel, searchHelper, nearestTitle, nearestEvTitle, nearestHint, distanceMeters, distanceKilometers, evConnectorsLabel, evTypeLabel, evUnknownConnectors, evUnknownType, showEvChargingLabel, directionsFromHereLabel }) {
    const ZagrebMapDynamic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
            loadableGenerated: {
                modules: [
                    "[project]/app/components/landing/ZagrebMapSection.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false,
            loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-[280px] w-full flex-col gap-6",
                    role: "status",
                    "aria-live": "polite",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: loadingLabel
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMapLoader.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-28 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMapLoader.tsx",
                            lineNumber: 79,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-h-[min(56vh,420px)] flex-1 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50 sm:min-h-[min(50vh,480px)]",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/app/components/landing/ZagrebMapLoader.tsx",
                            lineNumber: 83,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/landing/ZagrebMapLoader.tsx",
                    lineNumber: 73,
                    columnNumber: 13
                }, this)
        }), [
        loadingLabel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ZagrebMapDynamic, {
        locations: locations,
        evStations: evStations,
        parkingPriceLabels: parkingPriceLabels,
        freeSpotsLabel: freeSpotsLabel,
        capacityLabel: capacityLabel,
        mockEstimateNote: mockEstimateNote,
        missingApiKeyMessage: missingApiKeyMessage,
        searchLabel: searchLabel,
        searchPlaceholder: searchPlaceholder,
        searchAriaLabel: searchAriaLabel,
        searchHelper: searchHelper,
        nearestTitle: nearestTitle,
        nearestEvTitle: nearestEvTitle,
        nearestHint: nearestHint,
        distanceMeters: distanceMeters,
        distanceKilometers: distanceKilometers,
        evConnectorsLabel: evConnectorsLabel,
        evTypeLabel: evTypeLabel,
        evUnknownConnectors: evUnknownConnectors,
        evUnknownType: evUnknownType,
        showEvChargingLabel: showEvChargingLabel,
        directionsFromHereLabel: directionsFromHereLabel,
        bestParkingTitle: bestParkingTitle,
        fromDestinationLabel: fromDestinationLabel,
        directionsToBestGarageLabel: directionsToBestGarageLabel
    }, void 0, false, {
        fileName: "[project]/app/components/landing/ZagrebMapLoader.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_0pi-3zo._.js.map