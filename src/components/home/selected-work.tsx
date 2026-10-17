import { getTranslations } from "next-intl/server";

import { StatusBadge } from "@/components/project/status-badge";
import { Link } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/content";

export async function SelectedWork({ locale }: { locale: "tr" | "en" }) {
  const t = await getTranslations("home");
  const projects = getFeaturedProjects(locale).slice(0, 3);

  return (
    <section className="mt-20 md:mt-24">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground">
        {t("selectedWorkTitle")}
      </h2>

      <div className="mt-8 space-y-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group grid gap-5 rounded-lg border border-border bg-card p-3 md:grid-cols-2 md:p-4"
          >
            <Link
              href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
              className="block overflow-hidden rounded-md border border-border bg-secondary"
            >
              <img
                src={project.cover}
                alt={project.coverAlt}
                className="h-full min-h-52 w-full object-cover transition-transform duration-150"
              />
            </Link>

            <div className="flex flex-col justify-center p-1">
              <div className="text-sm text-muted-foreground">{project.year}</div>

              <h3 className="mt-3 text-2xl font-medium text-foreground">{project.title}</h3>

              <p className="mt-3 text-base text-muted-foreground">{project.outcome}</p>

              <div className="mt-4">
                <StatusBadge status={project.status} locale={locale} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((tech) => (
                  <span
                    key={`${project.slug}-${tech}`}
                    className="rounded border border-border bg-secondary px-2 py-1 text-xs font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-link">
                {project.links.live ? (
                  <a href={project.links.live} rel="noreferrer" target="_blank" className="hover:text-link-hover">
                    {t("viewLive")}
                  </a>
                ) : null}

                {project.links.repo ? (
                  <a href={project.links.repo} rel="noreferrer" target="_blank" className="hover:text-link-hover">
                    {t("viewRepo")}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-link hover:text-link-hover">
          {t("viewAllProjects")}
        </Link>
      </div>
    </section>
  );
}
