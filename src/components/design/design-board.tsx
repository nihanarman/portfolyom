const semanticColors = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "popover", className: "bg-popover" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "ring", className: "bg-ring" },
  { name: "link", className: "bg-link" },
  { name: "link-hover", className: "bg-link-hover" },
] as const;

const aquaSteps = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const typeRows = [
  { token: "text-6xl", weight: "font-semibold", role: "Hero başlık", sample: "Nihan Arman" },
  { token: "text-5xl", weight: "font-semibold", role: "Sayfa başlığı", sample: "Özgeçmiş" },
  { token: "text-4xl", weight: "font-semibold", role: "text-4xl", sample: "Wikkon" },
  { token: "text-3xl", weight: "font-semibold", role: "Bölüm başlığı", sample: "Seçili işler" },
  { token: "text-2xl", weight: "font-semibold", role: "Alt başlık", sample: "Şu an ne yapıyorum" },
  { token: "text-xl", weight: "font-medium", role: "Kart başlığı", sample: "Agri-Water" },
  { token: "text-lg", weight: "font-normal", role: "Giriş paragrafı", sample: "ğüşiöç ĞÜŞİÖÇ" },
  { token: "text-base", weight: "font-normal", role: "Gövde", sample: "Öğrendiğini anlamadan kabul etmeyen." },
  { token: "text-sm", weight: "font-normal", role: "İkincil / meta", sample: "Konya, Türkiye" },
  { token: "text-xs", weight: "font-normal", role: "text-xs", sample: "Mart 2026" },
  { token: "text-label", weight: "font-medium font-mono", role: "Veri etiketi", sample: "Next.js 16.3.5" },
] as const;

const buttonClass =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-100 ease-out";

const buttonVariants = [
  {
    name: "default",
    className: `${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90`,
    label: "Projelere bak",
  },
  {
    name: "outline",
    className: `${buttonClass} border border-input bg-background hover:bg-accent hover:text-accent-foreground`,
    label: "Özgeçmişi indir",
  },
  {
    name: "ghost",
    className: `${buttonClass} hover:bg-accent hover:text-accent-foreground`,
    label: "Tüm projeler",
  },
  {
    name: "link",
    className: `${buttonClass} text-link hover:text-link-hover hover:underline`,
    label: "Devamı",
  },
] as const;

const statuses = [
  { name: "Yayında", dot: "bg-status-live" },
  { name: "Geliştiriliyor", dot: "bg-status-wip" },
  { name: "Arşiv", dot: "bg-status-archived" },
] as const;

export function DesignBoard() {
  return (
    <div className="flex flex-col">
      <section>
        <h2 className="text-3xl font-semibold">Renkler</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Semantik tokenlar. Gövde metni nötr kalır; turkuaz yalnızca aksandadır.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {semanticColors.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div
                className={`h-16 rounded-lg border border-border ${color.className}`}
              />
              <p className="font-mono text-label font-medium text-muted-foreground">
                {color.name}
              </p>
            </div>
          ))}
        </div>
        <h3 className="mt-10 text-2xl font-semibold">Marka ölçeği</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Doğrudan kullanılmaz; tokenlar bunlardan türer.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {aquaSteps.map((step) => (
            <div key={step} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-lg border border-border"
                style={{ backgroundColor: `var(--aqua-${step})` }}
              />
              <p className="font-mono text-label font-medium text-muted-foreground">
                aqua-{step}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-semibold">Yazı boyutları</h2>
        <p className="text-muted-foreground mt-4 max-w-[var(--container-prose)] text-lg">
          IBM Plex Sans ve veri için IBM Plex Mono. Türkçe karakterler: ğ ı İ ş ç ö ü.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {typeRows.map((row) => (
            <div key={row.token}>
              <p className="font-mono text-label font-medium text-muted-foreground">
                {row.token}
              </p>
              <p className="text-sm text-muted-foreground">{row.role}</p>
              <p className={`mt-2 ${row.token} ${row.weight}`}>{row.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-semibold">Buton çeşitleri</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          default, outline, ghost, link. Hover yalnızca renk değiştirir.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {buttonVariants.map((button) => (
            <button key={button.name} type="button" className={button.className}>
              {button.label}
            </button>
          ))}
        </div>
        <p className="mt-4 font-mono text-label font-medium text-muted-foreground">
          default / outline / ghost / link
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-semibold">Durum rozetleri</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Renk tek başına anlam taşımaz; metin de yazılır.
        </p>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
          {statuses.map((status) => (
            <span
              key={status.name}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1 text-sm text-card-foreground"
            >
              <span className={`size-2 rounded-sm ${status.dot}`} aria-hidden />
              {status.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
