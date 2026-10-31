# Toprak Ehli

Modüler arsa ve arazi sitesi. Yerel panel korunur; Vercel Function + Supabase tabanlı online panel, merkezi portföy, görsel ve talep backend kodu eklendi. Gerçek Supabase hesabı henüz bağlanmadığından online üretim teslimi tamamlanmış değildir. Güncel durum: [HANDOVER.md](HANDOVER.md); kurulum: [DEPLOYMENT.md](DEPLOYMENT.md); test kanıtı: [TEST_REPORT.md](TEST_REPORT.md).

Yerel yönetim: önce `npm run admin:setup` ile kendi parolanızı oluşturun, sonra `npm run admin` ile `http://127.0.0.1:4180` adresini açın. Kullanım ve sınırlar: [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md).

## Kullanım

Node.js 24 ile önce `npm ci`, ardından `npm start`; adres `http://127.0.0.1:4175`. Windows'ta `ONIZLEMEYI_BASLAT.cmd` de kullanılabilir. Statik site tarayıcıda framework bağımlılığı kullanmaz; yeni backend/test araçları için npm bağımlılıkları gerekir. ES modülleri için yerel sunucu gereklidir.

Arama, sıralama, birleşik filtreler, üçlü karşılaştırma, kaynak/tarih/durum gösterimi, paylaşılabilir detay ve işletmenin iletişim bağlantıları çalışır. Demo ilanlar ve görseller gerçek parsel değildir.

Görsel yenileme: yeşil/altın tasarım, temsili AI açılış görseli, hareket azaltma destekli animasyonlar, responsive kartlar ve açılır sorular. Kapsam ve görsel üretim bilgisi: [docs/REDESIGN_REPORT.md](docs/REDESIGN_REPORT.md).

## Kontroller ve teslim

- `npm test`: domain, içerik, iletişim ve HTTP testleri.
- `npm run check`: JS/MJS sözdizimi; lint/typecheck değildir.
- `npm run build`: `content/listings.json` içindeki onaylı gerçek kayıtlarla ayrı statik paket oluşturur. Demo kayıtları alınmaz. Liste boşsa iletişim sitesi hazırlanır.
- `npm run release:check`: son paketin modül bütünlüğünü ve proje dosyalarının dışarıda kaldığını kontrol eder.

Kullanım, içerik şeması, yayın adımları ve kalan kapsam: [TESLIM_NOTLARI.md](TESLIM_NOTLARI.md). Son test raporu: [docs/DELIVERY_REPORT.md](docs/DELIVERY_REPORT.md). Altı fazın durumu: [docs/ROADMAP.md](docs/ROADMAP.md).

Özgün referans `reference/toprak_ehli_demo.html` korunur. SHA-256: `1e4a331a8e8b20bb44ba9d488a67f49a6139e60a5b173ae15a412eb88f742691`. Git kayıtları yereldir; yayın yapılmamıştır.
