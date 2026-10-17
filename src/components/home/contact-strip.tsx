import { getTranslations } from "next-intl/server";

export async function ContactStrip() {
  const t = await getTranslations("home");

  return (
    <section className="mt-20 md:mt-24">
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("contactTitle")}
        </h2>

        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("contactText")}</p>

        <div className="mt-6">
          <a
            href="mailto:nhnarman@gmail.com"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
          >
            {t("contactEmail")}
          </a>
        </div>
      </div>
    </section>
  );
}
