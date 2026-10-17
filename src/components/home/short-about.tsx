import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";

export async function ShortAbout() {
  const t = await getTranslations("home");

  return (
    <section className="mt-20 md:mt-24">
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-lg border border-border bg-secondary p-4">
          <div
            className="w-full rounded-md border border-dashed border-border bg-card/60"
            style={{ aspectRatio: "4 / 5" }}
            aria-label={t("profilePlaceholder")}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {t("aboutTitle")}
          </h2>

          <div className="mt-6 space-y-4 text-base text-muted-foreground">
            <p>{t("aboutParagraph1")}</p>
            <p>{t("aboutParagraph2")}</p>
            <p>{t("aboutParagraph3")}</p>
          </div>

          <div className="mt-6">
            <Link href="/about" className="inline-flex items-center text-sm font-medium text-link hover:text-link-hover">
              {t("aboutReadMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
