export function MapPlaceholder() {
  return (
    <section id="map" className="scroll-mt-20 border-y border-zinc-200/80 bg-zinc-50/30 px-4 py-12 dark:border-zinc-800/80 dark:bg-zinc-950/20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Map preview</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Drop in your map provider here—this area reserves layout only.
            </p>
          </div>
        </div>
        <div
          className="mt-6 flex aspect-[21/9] min-h-[200px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-[repeating-linear-gradient(315deg,transparent,transparent_8px,rgba(24,24,27,0.04)_8px,rgba(24,24,27,0.04)_16px)] dark:border-zinc-700 dark:bg-[repeating-linear-gradient(315deg,transparent,transparent_8px,rgba(255,255,255,0.03)_8px,rgba(255,255,255,0.03)_16px)] sm:aspect-[2.5/1] sm:min-h-[280px]"
          role="img"
          aria-label="Placeholder for future map"
        >
          <p className="rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-zinc-500 shadow-sm ring-1 ring-zinc-200 dark:text-zinc-400 dark:ring-zinc-700">
            Map integration placeholder
          </p>
        </div>
      </div>
    </section>
  );
}
