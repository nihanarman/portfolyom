import { CvDocument } from "@/components/cv/cv-document";

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const { locale = "tr" } = await params;

  return <CvDocument locale={locale === "en" ? "en" : "tr"} />;
}
