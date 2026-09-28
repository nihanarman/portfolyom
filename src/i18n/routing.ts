import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/projects": "/projects",
    "/projects/[slug]": "/projects/[slug]",
    "/cv": "/cv",
    "/contact": "/contact",
    "/notes": "/notes",
  },
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
