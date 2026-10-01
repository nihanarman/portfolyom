"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Link } from "@/i18n/routing";

const navItems = [
  { href: "/projects", labelKey: "projects" },
  { href: "/about", labelKey: "about" },
  { href: "/cv", labelKey: "cv" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-3 md:px-10">
        <Link href="/" className="text-base font-semibold text-foreground">
          Nihan Arman
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative text-sm font-medium text-foreground transition-colors",
                  isActive ? "after:absolute after:bottom-[-0.7rem] after:left-0 after:h-px after:w-full after:bg-primary" : "",
                ].join(" ")}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
