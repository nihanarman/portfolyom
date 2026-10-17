import Link from "next/link";

import { cv } from "@/data/cv";

type Locale = "tr" | "en";

type CvDocumentProps = {
  locale: Locale;
  isPrint?: boolean;
};

const sectionLabels = {
  tr: {
    summary: "Özet",
    education: "Eğitim",
    experience: "Deneyim ve projeler",
    community: "Topluluk",
    certificates: "Sertifikalar",
    skills: "Teknik beceriler",
    languages: "Diller",
    contact: "İletişim",
    pdfLabel: "PDF indir",
    printLabel: "Yazdır / PDF oluştur",
    project: "Proje",
    labels: {
      production: "Projelerde kullanıyorum",
      applied: "Uygulamalı çalışıyorum",
      basic: "Temel düzeyde",
    },
    kind: {
      sprint: "Sprint",
      "long-term": "Proje",
      competition: "Yarışma",
    },
  },
  en: {
    summary: "Summary",
    education: "Education",
    experience: "Experience and projects",
    community: "Community",
    certificates: "Certificates",
    skills: "Technical skills",
    languages: "Languages",
    contact: "Contact",
    pdfLabel: "Download PDF",
    printLabel: "Print / build PDF",
    project: "Project",
    labels: {
      production: "Used in projects",
      applied: "Applied work",
      basic: "Basic level",
    },
    kind: {
      sprint: "Sprint",
      "long-term": "Project",
      competition: "Competition",
    },
  },
} as const;

const getProjectHref = (locale: Locale, slug?: string) => {
  if (!slug) {
    return null;
  }

  return locale === "tr" ? `/projeler/${slug}` : `/en/projects/${slug}`;
};

export function CvDocument({ locale, isPrint = false }: CvDocumentProps) {
  const copy = sectionLabels[locale];
  const isTurkish = locale === "tr";
  const tagline = isTurkish ? cv.person.titleTr : cv.person.titleEn;
  const summary = isTurkish ? cv.summaryTr : cv.summaryEn;
  const pdfPath = isTurkish ? "/cv/nihan-arman-tr.pdf" : "/cv/nihan-arman-en.pdf";
  const printPath = isTurkish ? "/ozgecmis/yazdir" : "/en/cv/print";

  return (
    <div className={isPrint ? "cv-print-page" : "mx-auto w-full max-w-5xl py-16 md:py-20"}>
      {isPrint ? (
        <style>{`
          @page {
            size: A4;
            margin: 18mm;
          }

          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
          }

          body:has(.cv-print-page) header,
          body:has(.cv-print-page) footer,
          body:has(.cv-print-page) nav,
          body:has(.cv-print-page) [data-skip-link] {
            display: none !important;
          }

          .cv-print-page {
            background: #ffffff;
            color: #0f172a;
            font-family: "IBM Plex Sans", Arial, sans-serif;
            width: 100%;
            min-height: 100vh;
          }
          .cv-print-page a {
            color: inherit;
            text-decoration: none;
          }
        `}</style>
      ) : null}

      <div
        className={
          isPrint
            ? "rounded-none bg-white text-slate-900"
            : "rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10"
        }
      >
        {!isPrint ? (
          <div className="mb-8 flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {cv.person.name}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                {copy.pdfLabel}
              </a>
              <Link
                href={printPath}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {copy.printLabel}
              </Link>
            </div>
          </div>
        ) : null}

        <header className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {copy.contact}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {cv.person.name}
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">{tagline}</p>
          </div>

          <div className="grid gap-2 text-sm text-foreground md:text-right">
            <a href={`mailto:${cv.person.email}`} className="text-link hover:text-link-hover">
              {cv.person.email}
            </a>
            <a href={`tel:${cv.person.phone.replace(/\s+/g, "")}`} className="text-link hover:text-link-hover">
              {cv.person.phone}
            </a>
            <a href={cv.person.linkedin} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">
              LinkedIn
            </a>
            <a href={cv.person.github} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">
              GitHub
            </a>
          </div>
        </header>

        <main className="space-y-8 pt-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">{copy.summary}</h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">{summary}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{copy.education}</h2>
            <div className="space-y-4">
              {cv.education.map((item) => (
                <article key={`${item.institution}-${item.period}`} className="rounded-xl border border-border bg-muted/20 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.institution}</h3>
                      {item.program ? <p className="text-sm text-muted-foreground">{item.program}</p> : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                  </div>
                  {item.detail ? <p className="mt-2 text-sm text-foreground">{item.detail}</p> : null}
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{copy.experience}</h2>
            <div className="space-y-4">
              {cv.experience.map((item) => {
                const projectHref = getProjectHref(locale, item.linkedProjectSlug);
                return (
                  <article key={`${item.title}-${item.period}`} className="rounded-xl border border-border bg-muted/20 p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-foreground">
                            {isTurkish ? item.title : item.titleEn}
                          </h3>
                          <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            {copy.kind[item.kind]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {isTurkish ? item.period : item.periodEn}
                        </p>
                      </div>
                      {projectHref ? (
                        <Link href={projectHref} className="text-sm font-medium text-link hover:text-link-hover">
                          {copy.project}
                        </Link>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground">
                      {isTurkish ? item.summary : item.summaryEn}
                    </p>
                    {item.stack.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span
                            key={`${item.title}-${tech}`}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{copy.community}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {cv.community.map((item) => (
                <article key={`${item.role}-${item.org}`} className="rounded-xl border border-border bg-muted/20 p-4">
                  <p className="text-sm font-medium text-foreground">{item.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{copy.certificates}</h2>
            <div className="space-y-3">
              {cv.certificates.map((item) => (
                <article key={`${item.name}-${item.issuer}`} className="rounded-xl border border-border bg-muted/20 p-4">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.issuer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{copy.skills}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {(["production", "applied", "basic"] as const).map((level) => (
                <div key={level} className="rounded-xl border border-border bg-muted/20 p-4">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {copy.labels[level]}
                  </h3>
                  <ul className="space-y-2">
                    {cv.skills.technical
                      .filter((skill) => skill.level === level)
                      .map((skill) => {
                        const skillHref = getProjectHref(locale, skill.linkedProjectSlug);
                        return (
                          <li key={skill.name} className="flex items-center justify-between gap-3 text-sm text-foreground">
                            <span>{skill.name}</span>
                            {skillHref ? (
                              <Link href={skillHref} className="text-link hover:text-link-hover">
                                ↗
                              </Link>
                            ) : null}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{copy.languages}</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {cv.languages.map((language) => (
                <div key={language.name} className="rounded-xl border border-border bg-muted/20 p-4">
                  <p className="font-medium text-foreground">{language.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{language.level}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
