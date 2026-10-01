type StatusBadgeProps = {
  status: "live" | "wip" | "archived";
};

const statusLabels = {
  live: "Yayında",
  wip: "Geliştiriliyor",
  archived: "Arşiv",
} as const;

const statusColors = {
  live: "var(--status-live)",
  wip: "var(--status-wip)",
  archived: "var(--status-archived)",
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-foreground">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: statusColors[status] }}
      />
      {statusLabels[status]}
    </span>
  );
}
