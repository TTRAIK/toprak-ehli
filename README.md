# Toprak Ehli

Mevcut teslimat bir tanıtım prototipidir. Gerçek ilan, talep gönderimi veya backend içermez.

## Demoyu açma

`reference/toprak_ehli_demo.html` dosyasını güncel bir tarayıcıyla açın. Kurulum, paket indirme veya build gerekmez. Görseller dosyaya gömülüdür.

Bu dosya korunacak referanstır; geliştirme doğrudan üzerinde yapılmamalıdır.

SHA-256: `1e4a331a8e8b20bb44ba9d488a67f49a6139e60a5b173ae15a412eb88f742691`

## Durum

## Yeni uygulamayı çalıştırma

Node.js kurulu ortamda proje dizininde `npm start` çalıştırın; `http://127.0.0.1:4173` adresini açın. Bağımlılık kurulumu gerekmez. ES modülleri nedeniyle yeni `index.html` doğrudan dosya olarak değil yerel sunucudan açılmalıdır. Sunucu yalnız bu bilgisayara açıktır.

Kontroller: `npm test` ve `npm run check`. `check` sözdizimi kontrolüdür; lint veya typecheck değildir. Buildless uygulamada build adımı bulunmaz. `docs/ROADMAP.md` altı fazı ve karar kapılarını açıklar.

Teknik bulgular ve plan: [docs/BASELINE_AUDIT.md](docs/BASELINE_AUDIT.md).

Yerel Git deposu oluşturuldu. Domain/HTTP testleri ve sözdizimi kontrolü mevcut; lint/typecheck altyapısı yok. Faz 1'in Chrome üzerinde telefon, tablet, masaüstü ve temel klavye kontrolleri tamamlandı; kapsam ve sınırlamalar `docs/PHASE_1_REPORT.md` içinde kayıtlıdır.
