# Toprak Ehli

Modüler arsa ve arazi sitesi. Yerel demo, iletişim bağlantıları ve ayrı statik yayın paketi içerir. Gerçek talep backend'i veya yönetim paneli henüz yoktur.

## Kullanım

Node.js kurulu bilgisayarda `npm start`; adres `http://127.0.0.1:4175`. Windows'ta `ONIZLEMEYI_BASLAT.cmd` de kullanılabilir. Bağımlılık indirme gerekmez. ES modülleri için yerel sunucu gereklidir.

Arama, sıralama, birleşik filtreler, üçlü karşılaştırma, kaynak/tarih/durum gösterimi, paylaşılabilir detay ve işletmenin iletişim bağlantıları çalışır. Demo ilanlar ve görseller gerçek parsel değildir.

## Kontroller ve teslim

- `npm test`: domain, içerik, iletişim ve HTTP testleri.
- `npm run check`: JS/MJS sözdizimi; lint/typecheck değildir.
- `npm run build`: `content/listings.json` içindeki onaylı gerçek kayıtlarla ayrı statik paket oluşturur. Demo kayıtları alınmaz. Liste boşsa iletişim sitesi hazırlanır.
- `npm run release:check`: son paketin modül bütünlüğünü ve proje dosyalarının dışarıda kaldığını kontrol eder.

Kullanım, içerik şeması, yayın adımları ve kalan kapsam: [TESLIM_NOTLARI.md](TESLIM_NOTLARI.md). Son test raporu: [docs/DELIVERY_REPORT.md](docs/DELIVERY_REPORT.md). Altı fazın durumu: [docs/ROADMAP.md](docs/ROADMAP.md).

Özgün referans `reference/toprak_ehli_demo.html` korunur. SHA-256: `1e4a331a8e8b20bb44ba9d488a67f49a6139e60a5b173ae15a412eb88f742691`. Git kayıtları yereldir; yayın yapılmamıştır.
