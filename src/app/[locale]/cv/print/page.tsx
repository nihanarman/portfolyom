import { CvDocument } from "@/components/cv/cv-document";

export default async function EnglishCvPrintPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const { locale = "en" } = await params;

  return <CvDocument locale={locale === "tr" ? "tr" : "en"} isPrint />;
}
