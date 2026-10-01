import { getTranslations } from "next-intl/server";

import { ProjectCard } from "@/components/project/project-card";
import { ProjectFilter } from "@/components/project/project-filter";
import { getAllProjects } from "@/lib/content";

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tech?: string }>;
}) {
  const { locale } = await params;
  const { tech } = await searchParams;
  const safeLocale = locale === "en" ? "en" : "tr";
  const t = await getTranslations("projects");

  const projects = getAllProjects(safeLocale);
  const stackOptions = Array.from(new Set(projects.flatMap((project) => project.stack))).sort();
  const selectedTech = tech && tech !== "all" ? tech : "all";
  const visibleProjects =
    selectedTech === "all"
      ? projects
      : projects.filter((project) => project.stack.includes(selectedTech));

  return (
    <div className="py-20 md:py-32">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mt-10">
        <ProjectFilter options={["all", ...stackOptions]} selected={selectedTech} />
      </div>

      {visibleProjects.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={safeLocale} />
          ))}
        </div>
      )}
    </div>
  );
}
