import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CalloutProps = {
  type?: "note" | "info" | "warning";
  children: ReactNode;
};

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
};

const proseStyle = {
  maxWidth: "var(--container-prose)",
} as const;

function Callout({ type = "note", children }: CalloutProps) {
  const palette = {
    note: "border-border bg-secondary text-foreground",
    info: "border-primary/50 bg-primary/10 text-foreground",
    warning: "border-amber-500/50 bg-amber-500/10 text-foreground",
  };

  return (
    <aside className={`my-6 rounded-lg border p-4 text-sm ${palette[type]}`}>
      {children}
    </aside>
  );
}

function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} className="w-full rounded-lg border border-border bg-card" />
      <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

const sharedHeadingClass = "mt-8 scroll-mt-24 text-foreground";

export const MDXComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={`${sharedHeadingClass} text-2xl font-semibold`} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={`${sharedHeadingClass} text-xl font-semibold`} {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5 text-base leading-7 text-foreground" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = typeof href === "string" && !href.startsWith("/") && !href.startsWith("#");

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-medium text-link underline-offset-4 hover:text-link-hover"
        {...props}
      >
        {children}
        {isExternal ? <span className="sr-only"> (yeni sekmede açılır)</span> : null}
      </a>
    );
  },
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-base leading-7 text-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-base leading-7 text-foreground" {...props}>
      {children}
    </ol>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded border border-border bg-secondary px-1.5 py-0.5 text-sm text-foreground" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  Callout,
  Figure,
  wrapper: ({ children }: { children: ReactNode }) => <div style={proseStyle}>{children}</div>,
};

export default MDXComponents;
