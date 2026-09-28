import { getTranslations } from "next-intl/server";

export default async function NotesPage() {
  const t = await getTranslations("notes");

  return (
    <main id="main" className="mx-auto w-full max-w-content px-6 py-20 md:px-10 md:py-32">
      <h1 className="text-5xl font-semibold">{t("title")}</h1>
    </main>
  );
}
