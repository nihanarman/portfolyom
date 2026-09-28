import type { Metadata } from "next";
import { DesignBoard } from "@/components/design/design-board";

export const metadata: Metadata = {
  title: "Tasarım | Nihan Arman",
  description: "Geçici tasarım sistemi önizlemesi. Site bitince silinir.",
};

export default function DesignSystemPage() {
  return (
    <>
      <a
        href="#main"
        className="bg-primary text-primary-foreground focus:ring-ring absolute top-4 left-4 z-50 rounded-md px-4 py-2 text-sm font-medium opacity-0 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        İçeriğe geç
      </a>
      <main
        id="main"
        className="mx-auto w-full max-w-[var(--container-content)] px-6 py-20 md:px-10 md:py-32"
      >
        <h1 className="text-5xl font-semibold">Tasarım sistemi</h1>
        <p className="text-muted-foreground mt-4 max-w-[var(--container-prose)] text-lg">
          Geçici sayfa. Açık tema bu sütunda, koyu tema altındaki kartta. Site
          bitince silinir.
        </p>

        <h2 className="mt-10 text-3xl font-semibold">Açık tema</h2>
        <div className="mt-10">
          <DesignBoard />
        </div>

        <h2 className="mt-10 text-3xl font-semibold">Koyu tema</h2>
        <div className="dark mt-10 rounded-lg border border-border bg-background p-6 text-foreground md:p-10">
          <DesignBoard />
        </div>
      </main>
    </>
  );
}
