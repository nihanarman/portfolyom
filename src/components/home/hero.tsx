import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";

export async function Hero() {
  const t = await getTranslations("home");
  const heroTitle = t("heroTitle").split("\n");
  const heroDescription = t("heroDescription").split("\n");

  return (
    <section className="home-reveal pt-20 md:pt-24">
      <div className="max-w-3xl">
        <h1 className="text-6xl font-semibold tracking-tight text-foreground">
          {heroTitle.map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-5 max-w-prose space-y-2 text-lg text-muted-foreground">
          {heroDescription.map((sentence, index) => (
            <p key={`${sentence}-${index}`}>{sentence}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
          >
            {t("primaryCta")}
          </Link>

          <Link
            href="/cv"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary hover:text-primary"
          >
            {t("secondaryCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
