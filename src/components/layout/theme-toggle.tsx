"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const t = useTranslations("common");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (resolvedTheme ?? theme ?? "system") : "system";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t("toggleTheme")}
      onClick={() => {
        if (currentTheme === "light") {
          setTheme("dark");
          return;
        }
        if (currentTheme === "dark") {
          setTheme("system");
          return;
        }
        setTheme("light");
      }}
      title={t("toggleTheme")}
    >
      {currentTheme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : currentTheme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
    </Button>
  );
}
