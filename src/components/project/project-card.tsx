import { StatusBadge } from "@/components/project/status-badge";
import { Link } from "@/i18n/routing";

type ProjectCardProps = {
  project: {
    slug: string;
    title: string;
    summary: string;
    outcome: string;
    stack: string[];
    year: number;
    cover: string;
    coverAlt: string;
    status: "live" | "wip" | "archived";
  };
  locale: "tr" | "en";
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition-transform duration-150 hover:-translate-y-1 hover:border-primary/70">
      <Link href={`/projects/${project.slug}` as any} className="block">
        <div className="overflow-hidden border-b border-border bg-secondary">
          <img src={project.cover} alt={project.coverAlt} className="h-48 w-full object-cover" />
        </div>

        <div className="p-5">
          <div className="mb-3">
            <StatusBadge status={project.status} />
          </div>

          <h2 className="text-xl font-medium text-foreground">{project.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{project.outcome}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={`${project.slug}-${tech}`}
                className="rounded border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
            <span>{locale === "tr" ? "Yıl" : "Year"}</span>
            <span className="font-medium text-foreground">{project.year}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
