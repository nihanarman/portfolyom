"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProjectFilterProps = {
  options: string[];
  selected: string;
};

export function ProjectFilter({ options, selected }: ProjectFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("projects");

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("tech");
    } else {
      params.set("tech", value);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const label = option === "all" ? t("all") : option;
        const isActive = selected === option;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleSelect(option)}
            className={[
              "rounded-md border px-3 py-2 text-sm font-medium transition-colors duration-150",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/70",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
