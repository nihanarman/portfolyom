"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const localeOptions = [
  { code: "tr", label: "TR", title: "Türkçe" },
  { code: "en", label: "EN", title: "English" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");

  const getPathWithoutLocale = (path: string) => {
    const nextPath = path.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";
    return nextPath === "" ? "/" : nextPath;
  };

  const getTargetPath = (targetLocale: string) => {
    const pathWithoutLocale = getPathWithoutLocale(pathname);

    if (targetLocale === "tr") {
      return pathWithoutLocale === "/" ? "/" : pathWithoutLocale;
    }

    return pathWithoutLocale === "/" ? "/en" : `/en${pathWithoutLocale}`;
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background p-1">
      {localeOptions.map((option) => {
        const isActive = locale === option.code;
        const targetPath = getTargetPath(option.code);

        return (
          <button
            key={option.code}
            type="button"
            aria-label={`${t("switchLanguage")}: ${option.title}`}
            title={`${t("switchLanguage")}: ${option.title}`}
            onClick={() => {
              if (!isActive) {
                window.location.href = targetPath;
              }
            }}
            className={[
              "rounded px-2 py-1 text-[11px] font-semibold tracking-[0.08em] transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
