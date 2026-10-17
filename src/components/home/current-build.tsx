import { getTranslations } from "next-intl/server";

import { site } from "@/data/site";

export async function CurrentBuild() {
  const t = await getTranslations("home");

  return (
    <section className="mt-20 md:mt-24">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("currentBuildTitle")}</h2>
          <span className="font-mono text-sm text-muted-foreground">{site.currentBuild.updatedAt}</span>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <span className="text-sm text-muted-foreground">{t("currentBuildProject")}</span>
            <span className="font-medium text-foreground">{site.currentBuild.project}</span>
          </div>

          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <span className="text-sm text-muted-foreground">{t("currentBuildPhase")}</span>
            <span className="font-mono text-sm text-foreground">{site.currentBuild.phase}</span>
          </div>

          <div className="rounded-md border border-border bg-secondary p-4">
            <p className="text-sm text-muted-foreground">{t("currentBuildLearned")}</p>
            <p className="mt-2 text-base text-foreground">{site.currentBuild.whatLearned}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
