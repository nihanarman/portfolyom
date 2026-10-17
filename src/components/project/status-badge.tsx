type StatusBadgeProps = {
  status: "live" | "wip" | "archived";
  locale?: "tr" | "en";
};

const statusLabels = {
  live: { tr: "Yayında", en: "Live" },
  wip: { tr: "Geliştiriliyor", en: "In progress" },
  archived: { tr: "Arşiv", en: "Archived" },
} as const;

const statusColors = {
  live: "var(--status-live)",
  wip: "var(--status-wip)",
  archived: "var(--status-archived)",
} as const;

export function StatusBadge({ status, locale = "tr" }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium text-foreground">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: statusColors[status] }}
      />
      {statusLabels[status][locale]}
    </span>
  );
}
