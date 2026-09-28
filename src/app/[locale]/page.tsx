import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main id="main" className="mx-auto w-full max-w-content px-6 py-20 md:px-10 md:py-32">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("primaryCta")}
      </a>
      <h1 className="text-5xl font-semibold">{t("heroTitle")}</h1>
      <p className="mt-4 max-w-prose text-lg text-muted-foreground">
        {t("heroDescription")}
      </p>
    </main>
  );
}
