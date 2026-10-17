import { ContactStrip } from "@/components/home/contact-strip";
import { CurrentBuild } from "@/components/home/current-build";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { ShortAbout } from "@/components/home/short-about";
import { TrajectoryLine } from "@/components/home/trajectory-line";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale === "en" ? "en" : "tr";

  return (
    <div className="py-20 md:py-32">
      <Hero />
      <TrajectoryLine locale={safeLocale} />
      <SelectedWork locale={safeLocale} />
      <CurrentBuild />
      <ShortAbout />
      <ContactStrip />
    </div>
  );
}
