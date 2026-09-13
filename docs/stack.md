# Teknoloji Yığını ve Gerekçeler

Bu dosya, projede kullanılan her önemli teknolojinin **neden** seçildiğini kayıt altına alır. Yeni bir bağımlılık eklenmeden önce buraya bir satır eklenir; kaldırılan bir bağımlılığın satırı silinmez, "Kaldırıldı (tarih) — sebep" notuyla işaretlenir.

## Çekirdek

| Teknoloji | Neden |
|---|---|
| Next.js 15 (App Router) | Server Component varsayılanı sayesinde bu proje ölçeğinde neredeyse hiç istemci JS'i göndermeden statik + dinamik içerik üretebiliyoruz. |
| TypeScript (strict) | CV verisi (`data/cv.ts`) ve proje frontmatter'ı tek tip kaynaktan besleniyor; tip hatası, yanlış alanla site build'inin geçmesini engelliyor. |
| Tailwind CSS v4 | `@theme` bloğuyla tasarım token'larını doğrudan CSS değişkenlerine bağlıyoruz, ayrı bir `tailwind.config.js` katmanı yok. |
| shadcn/ui (Base UI tabanlı) | Bileşenler kopyalanıp projeye dahil oluyor, gizli bir paket bağımlılığı yaratmıyor — istediğimiz zaman token'lara göre elle düzenleyebiliyoruz. |

## İçerik

| Teknoloji | Neden |
|---|---|
| MDX + gray-matter + zod | Proje ve not içerikleri dosya olarak tutuluyor, CMS'e gerek yok; zod şeması eksik/yanlış bir frontmatter alanında build'i kırıyor, sessizce yayınlanmıyor. |
| rehype-pretty-code (Shiki) | Kod bloklarını build zamanında renklendiriyor, istemci tarafında ek bir kütüphane çalıştırmıyoruz. |

## Neden bazı şeyleri kullanmıyoruz

| Kullanılmayan | Sebep |
|---|---|
| Framer Motion / GSAP | Site sessiz ve okunaklı kalmalı; tek animasyonlu an (hero girişi) CSS ile yeterli. |
| Veritabanı / CMS | İçerik derleme zamanında bilinir, ziyaretçiye göre değişmez. |
| Redux / Zustand | Global durum yok — tema ve dil `next-themes` / `next-intl` ile yönetiliyor. |

*Son güncelleme: proje kurulum aşaması, Eylül 2026.*