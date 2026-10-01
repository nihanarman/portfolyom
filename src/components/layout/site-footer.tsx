import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";

import { cv } from "@/data/cv";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const person = cv.person;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-8 md:px-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{person.name}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-link hover:text-link-hover"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
              <span className="sr-only">(yeni sekmede açılır)</span>
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-link hover:text-link-hover"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              LinkedIn
              <span className="sr-only">(yeni sekmede açılır)</span>
            </a>
            <a
              href={`mailto:${person.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-link hover:text-link-hover"
            >
              <Mail className="h-4 w-4" />
              E-posta
              <span className="sr-only">(yeni sekmede açılır)</span>
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">© {currentYear} {person.name}</p>
      </div>
    </footer>
  );
}
