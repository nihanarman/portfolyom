Mimari ve Büyüme Planı
Şu anki yapı
src/
  app/[locale]/...       # sayfalar
  components/            # ui (shadcn) + layout + home + project + cv + mdx
  content/projects, notes # MDX, dil bazında ayrılmış
  data/cv.ts              # TEK KAYNAK — CV, PDF ve JSON-LD buradan beslenir
  lib/                    # içerik okuma, doğrulama, metadata

Neden bu yapı ölçekleniyor: Yeni bir proje eklemek yeni bir .mdx dosyası + data/cv.ts'ye bir experience girdisi demek. Ne yeni bir bileşen, ne şema değişikliği, ne yeniden tasarım gerekiyor. Bu, sitenin önümüzdeki yıllarda büyük bir refactor'a ihtiyaç duymadan büyümesini sağlayan asıl karar.

Evrim planı — neden şimdi sade, ne zaman değişecek

Bu site tek seferlik bir teslimat değil, öğrencilikten profesyonel hayata geçişte birlikte büyüyecek bir sistem. Bu yüzden görsel/etkileşim karmaşıklığı kanıta bağlı olarak açılır, keyfi olarak değil.

Aşama	Ne zaman	Ne değişir
v1 — Öğrenci (şimdi)	2. sınıf, 3 proje, sprint'ler	Şartnamedeki disiplin aynen korunur: tek orkestre animasyon, sade renk kullanımı, gölge yok. Az içerik + fazla görsel efekt = orantısız durur.
v2 — İlk iş deneyimi	Staj veya ilk iş başladığında	cv.ts'deki CvExperienceEntry.kind union'ına "employment" eklenir. Ana sayfaya "Deneyim" bölümü girer (İlerleme Çizgisi'nin devamı olarak, ayrı bir bölüm değil). Animasyon bütçesi hafifçe açılabilir: sayfa geçişlerinde View Transitions gibi tek yeni bir katman — aynı anda birden fazla yeni efekt eklenmez.
v3 — Çok sayıda büyük proje	4-5+ ciddi proje biriktiğinde	Proje listesi filtreleme/arama kazanır, öne çıkan işler ana sayfada rotasyonlu gösterilebilir. Bu noktada görsel kimlik (tipografi ölçeği, renk sistemi) değiştirilmez, sadece düzen genişler — turkuaz/IBM Plex kimliği sabit kalır, bu marka tutarlılığı iş görüşmesinde tanınırlık yaratır.

Kural: Her aşama geçişi (v1→v2, v2→v3) docs/decisions/ altına numaralı bir ADR olarak yazılır (örn. 0001-deneyim-bolumu-eklendi.md). Neyin değiştiğini ve neden o an değiştirildiğini içerir. Bu, sitenin kendisinin de bir "vaka çalışması" olmasını sağlar — iş görüşmesinde "sitenizi nasıl geliştirdiniz" sorusuna repo geçmişiyle cevap verebilirsin.

Veri akışı
data/cv.ts ──┬──> /ozgecmis sayfası (React render)
             ├──> scripts/build-cv-pdf.ts (Playwright → PDF)
             └──> JSON-LD Person şeması (SEO)

content/projects/*.mdx ──> zod doğrulama ──> /projeler/[slug] + OG görseli

Tek kaynak ilkesi korundukça yeni bir proje veya iş deneyimi eklemek asla iki yerde aynı bilgiyi güncellemeyi gerektirmez.

Son güncelleme: proje kurulum aşaması, Eylül 2026.