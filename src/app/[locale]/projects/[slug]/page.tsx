import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { StatusBadge } from "@/components/project/status-badge";
import { Link, routing } from "@/i18n/routing";
import { getAllProjects, renderMdx } from "@/lib/content";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjects(locale).map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale = locale === "en" ? "en" : "tr";
  const projects = getAllProjects(safeLocale);
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("projects");
  const content = await renderMdx(project.content);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/projects" className="text-link hover:text-link-hover">
                {t("title")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{project.title}</li>
          </ol>
        </nav>

        <header className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <StatusBadge status={project.status} />
          </div>
          <h1 className="text-5xl font-semibold">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>
        </header>

        <div className="mt-10 grid gap-8 rounded-xl border border-border bg-card p-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <img
              src={project.cover}
              alt={project.coverAlt}
              className="h-auto w-full rounded-lg border border-border bg-secondary"
            />
          </div>

          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Rol</dt>
              <dd className="mt-1 font-medium text-foreground">{project.role}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Dönem</dt>
              <dd className="mt-1 font-medium text-foreground">{project.period}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Durum</dt>
              <dd className="mt-1 font-medium text-foreground">{project.status}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Ekip</dt>
              <dd className="mt-1 font-medium text-foreground">{project.team}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-muted-foreground">Teknolojiler</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded border border-border bg-secondary px-2 py-1 text-xs font-medium text-foreground">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Canlı</dt>
              <dd className="mt-1 font-medium text-foreground">
                {project.links.live ? (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">
                    Link
                  </a>
                ) : (
                  "-"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Repo</dt>
              <dd className="mt-1 font-medium text-foreground">
                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">
                    GitHub
                  </a>
                ) : (
                  "-"
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 max-w-3xl">{content}</div>

        <nav aria-label="Project navigation" className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          {previousProject ? (
            <Link href={`/projects/${previousProject.slug}` as any} className="text-link hover:text-link-hover">
              ← {previousProject.title}
            </Link>
          ) : (
            <span className="text-muted-foreground">Önceki proje</span>
          )}

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}` as any} className="text-link hover:text-link-hover">
              {nextProject.title} →
            </Link>
          ) : (
            <span className="text-muted-foreground">Sonraki proje</span>
          )}
        </nav>
      </div>
    </article>
  );
}
