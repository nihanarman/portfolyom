import { getTranslations } from "next-intl/server";

export default async function ProjectDetailPage() {
  const t = await getTranslations("projects");

  return (
    <div className="py-20 md:py-32">
      <h1 className="text-5xl font-semibold">{t("title")}</h1>
    </div>
  );
}
