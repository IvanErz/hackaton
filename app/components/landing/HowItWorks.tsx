const steps = [
  {
    title: "Choose your area",
    body: "Search or pick a zone on the map to see lots with live counts.",
  },
  {
    title: "Compare spots",
    body: "Distance, price, and free spaces update as drivers come and go.",
  },
  {
    title: "Park with confidence",
    body: "Head to a location that still has room—no more guessing.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          How it works
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Three steps from search to spot—your backend can power the same flow.
        </p>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-500">
                {i + 1}
              </span>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
