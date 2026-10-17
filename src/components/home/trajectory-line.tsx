import { getTrajectory } from "@/data/trajectory";

export function TrajectoryLine({ locale }: { locale: "tr" | "en" }) {
  const items = getTrajectory(locale);

  return (
    <section className="home-reveal mt-20 md:mt-24">
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute inset-x-0 top-5 h-px bg-border" aria-hidden="true" />

          <div className="relative grid gap-6 md:grid-cols-5">
            {items.map((item) => (
              <div key={`${item.date}-${item.title}`} className="group relative">
                <div className="flex flex-col items-start gap-3">
                  <span
                    className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-primary"
                    aria-hidden="true"
                  />
                  <div className="text-label font-medium text-muted-foreground">{item.date}</div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                </div>

                <div className="pointer-events-none absolute left-0 top-12 z-20 w-52 rounded-md border border-border bg-popover p-3 text-sm text-popover-foreground opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="mt-1 text-muted-foreground">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="relative ml-2 border-l border-border pl-6">
          {items.map((item) => (
            <div key={`${item.date}-${item.title}`} className="group relative pb-6 last:pb-0">
              <span
                className="absolute -left-6 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-primary bg-primary"
                aria-hidden="true"
              />

              <div className="text-label font-medium text-muted-foreground">{item.date}</div>
              <div className="mt-1 text-sm font-medium text-foreground">{item.label}</div>

              <div className="mt-2 rounded-md border border-border bg-card p-3 text-sm text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                <div className="font-medium text-foreground">{item.title}</div>
                <div className="mt-1">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
