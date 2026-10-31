# Uygulama planı

1. [x] Başlangıç denetimi, 18 testi yeniden çalıştırma.
2. [ ] Çevrim içi veri modeli, doğrulama, draft/published/sold/archived durumları, merkezi revizyon ve transaction migration.
3. [ ] Supabase Auth üzerinden giriş; sunucu oturumu, yönetici allowlist, kalıcı rate limit, CSRF/Origin/secure cookie.
4. [ ] API: ortak portföy, yetkili kaydet/yayınla/yayından kaldır/arşiv, snapshot/restore/audit.
5. [ ] Private Storage, decode/reencode edilmiş WebP varyantları, çoklu fotoğraf/kapak/sıra, referans kontrolü.
6. [ ] Mevcut görsel kimliğiyle online panel; kirli form uyarısı, arama/filtre/sıralama, önizleme ve JSON export.
7. [ ] Halka açık siteyi merkezi kaynağa bağlama, hata/yükleme/boş durumlar, detay galerisi, metadata.
8. [ ] İşletme onaylı aydınlatma yapılandırmasına bağlı form ve yetkili talep ekranı.
9. [ ] Mevcut testleri koruyarak yeni birim/API sözleşme testleri; erişim varsa gerçek Supabase entegrasyonu ve tarayıcı A–D.
10. [ ] Preview build, doğrulama ve sekiz teslim belgesi. Supabase hesabı kurulmadan gerçek DB/Storage/E2E sonucu başarılı sayılmayacak.

## Dış bağımlılıklar

Kullanıcı Supabase hesabı olmadığını belirtti. Ücretsiz projenin kullanıcı hesabında açılması, migration'ın uygulanması, yönetici kullanıcısının oluşturulması ve gizli environment değerlerinin güvenli girilmesi gerekli. Ücretli servis açılmayacak. Gerçek ilan/fotoğraf, domain ve hukuki metin uydurulmayacak. Production yayını için yeni sürüm hazır olduğunda somut sonuç üzerinden onay istenecek.
