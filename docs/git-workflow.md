# Branch Stratejisi ve PR Akışı

Bu proje tek kişilik ama profesyonel alışkanlıkları öğrenmek ve göstermek amacıyla disiplinli bir Git akışı kullanıyor. Tam GitFlow (main/dev/test/staging) burada gereksiz — Vercel'in her PR için ürettiği otomatik önizleme deployment'ı, ayrı bir "test" branch'inin çözdüğü sorunu zaten çözüyor.

## Kural

- `main` her zaman çalışır ve deploy edilebilir durumda kalır. Doğrudan commit atılmaz.
- Her iş bloğu (şartnamedeki Bölüm 14 adımlarından biri veya bir parçası) kendi `feature/...` branch'inde yapılır.
- Branch adı ne yapıldığını anlatır: `feature/tasarim-token-fontlar`, `feature/proje-sayfalari`, `feature/cv-sayfasi`.
- İş bitince Pull Request açılır, Vercel önizlemesi kontrol edilir, `main`'e merge edilir, branch silinir.
- Ayrı `dev` veya `test` branch'i tutulmaz — bu, tek kişilik ve sürekli entegrasyon (CI) korumalı bir projede fazladan bakım yüküdür.

## Standart döngü

```
git checkout main
git pull
git checkout -b feature/<iş-adı>

# ... çalış, commit ata ata ilerle ...
git add .
git commit -m "feat: <ne yapıldığı>"

git push -u origin feature/<iş-adı>
# GitHub'da PR aç, Vercel önizlemesini kontrol et, merge et, branch'i sil

git checkout main
git pull
```

## Commit mesajı biçimi

Conventional Commits kısaltılmış hâli kullanılır:

| Önek | Ne zaman |
|---|---|
| `feat:` | Yeni bir özellik/sayfa/bileşen |
| `fix:` | Hata düzeltmesi |
| `chore:` | Bağımlılık, yapılandırma, dokümantasyon gibi kod-dışı değişiklik |
| `refactor:` | Davranış değişmeden yapılan yeniden düzenleme |

## CI kapısı

Her PR'da `.github/workflows/ci.yml` otomatik çalışır: `tsc --noEmit` ve `next build`. İkisi de geçmeden merge etmemek kural — kırmızı çarpılı bir PR'ı "elle test ettim, sorun yok" diyerek birleştirmek bu disiplinin anlamını ortadan kaldırır.

*Son güncelleme: proje kurulum aşaması, Eylül 2026.*