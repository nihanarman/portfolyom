import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="py-20 md:py-32">
      <h1 className="text-5xl font-semibold">{t("heroTitle")}</h1>
      <p className="mt-4 max-w-prose text-lg text-muted-foreground">
        {t("heroDescription")}
      </p>
    </div>
  );
}
