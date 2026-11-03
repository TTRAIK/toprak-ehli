# Toprak Ehli

Arsa ve arazi portföy sitesi; açık/koyu tema, harita ile bölge keşfi ve Supabase tabanlı yönetim paneli.

- **Canlı site:** https://toprak-ehli-demo.vercel.app/
- **Yönetim paneli:** https://toprak-ehli-demo.vercel.app/admin/ — yönetici hesabı gerekir.

## Bilgisayarında çalıştır

Node.js **24** ve Git kurulu olmalı.

```sh
git clone https://github.com/TTRAIK/toprak-ehli.git
cd toprak-ehli
npm ci
npm start
```

Tarayıcıda http://127.0.0.1:4175/ adresini aç. Yerel siteyi görmek için Supabase anahtarı veya yönetici parolası gerekmez. Windows'ta kurulumdan sonra ONIZLEMEYI_BASLAT.cmd de kullanılabilir. Sunucuyu Ctrl+C ile durdurabilirsin.

## Neler var?

- Beyaz ve ferah yeşil-gri koyu tema; tarayıcıda saklanan ortak tema tercihi.
- Portföy arama, bölge/fiyat/alan filtreleri, sıralama ve üçlü karşılaştırma.
- Karttan açılan detay, paylaşım bağlantısı ve OpenStreetMap bölge haritası. Kesin koordinat yoksa parsel pini uydurulmaz.
- WhatsApp, telefon ve e-posta bağlantıları; hareket azaltma destekli animasyonlar.
- Online admin: ilan taslağı/yayın/arşiv, fotoğraf yükleme/sıralama, vitrin seçimi, koordinat alanları, uygulama yedekleri ve işlem geçmişi.

## Veri ve sınırlar

Canlı sitedeki **18 kaynak katalog kaydı** doğrulama bekleyen bilgiler ve temsili görseller içerir; katalog şu an panelden düzenlenmez. **8 yeni kayıt**, canlı veritabanında belge kontrolü bekleyen taslaklardır; kamuya açık listede görünmezler. Kamuya açık bu depodaki taslak dosyası da doğrulama veya satış onayı değildir. TARLA ifadesi tek/paylı mülkiyet şeklini göstermez.

Merkezi yönetim için Supabase hesabı bağlıdır; depoyu indirmek canlı veritabanına veya admin hesabına erişim vermez. Kendi backend kurulumun için .env.example ve [DEPLOYMENT.md](DEPLOYMENT.md) dosyasına bak; kendi projen ve anahtarların gerekir. Anahtarları frontend'e veya Git'e koyma. Alternatif yerel yönetim: npm run admin:setup, ardından npm run admin; [kılavuz](docs/ADMIN_GUIDE.md).

Hukuki metin tamamlanmadığından web talep formu kapalıdır. Panel girişinde MFA henüz yoktur. Güvenlik incelemesinin kapsamı ve kalan işler [güvenlik raporunda](docs/ADMIN_SECURITY_REPORT_2026-11-03.md); son tema kontrolleri [admin teslim notunda](docs/ADMIN_THEME_RELEASE_2026-11-03.md) bulunur.

## Kontroller

```sh
npm test
npm run lint
npm run check
```

Son çalıştırmada 57 test geçti. Proje HTML/CSS/ES modülleri kullanır; backend Vercel Node Functions, Supabase ve Sharp ile çalışır. Özel anahtarlar, .private yedekleri, .env dosyaları ve veritabanı oturumları depoya dahil değildir.

## Geliştirici belgeleri

[Kurulum](DEPLOYMENT.md) · [Teslim bilgileri](HANDOVER.md) · [Harita ve animasyonlar](docs/MAP_MOTION_RELEASE.md) · [İçerik ve kullanım](TESLIM_NOTLARI.md)

README güncel başlangıç noktasıdır; eski tarihli raporlar o tarihteki durumu anlatır.
