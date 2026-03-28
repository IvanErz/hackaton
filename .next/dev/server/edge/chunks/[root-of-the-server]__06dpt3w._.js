(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__06dpt3w._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/i18n/config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/config.ts [middleware-edge] (ecmascript)");
;
;
function middleware(request) {
    const raw = request.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"])?.value;
    let locale = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["defaultLocale"];
    if (raw && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["locales"].includes(raw)) {
        locale = raw;
    } else {
        const accept = request.headers.get("accept-language");
        if (accept && /^en/i.test(accept.trim())) {
            locale = "en";
        }
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LOCALE_REQUEST_HEADER"], locale);
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        }
    });
    if (!raw || !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["locales"].includes(raw)) {
        res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"], locale, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
            sameSite: "lax"
        });
    }
    return res;
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__06dpt3w._.js.map