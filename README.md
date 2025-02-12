# 🚗 Monty Hall Problemi Simülasyonu

Bu proje, ünlü Monty Hall problemini interaktif bir şekilde deneyimlemenizi ve simüle etmenizi sağlayan bir web uygulamasıdır.

🌐 **[Canlı Demo: montyhall.dogru.dev](https://montyhall.dogru.dev)**

## 🎮 Monty Hall Problemi Nedir?

Monty Hall problemi, olasılık teorisinde sıkça tartışılan ilginç bir paradokstur. Problem şu şekilde işler:

1. Önünüzde üç kapalı kapı var
2. Kapıların birinin arkasında bir araba, diğer ikisinin arkasında birer keçi var
3. Siz bir kapı seçiyorsunuz
4. Sunucu (Monty Hall), kalan kapılardan birini açıyor ve arkasında keçi olduğunu gösteriyor
5. Sunucu size seçiminizi değiştirme şansı veriyor

İlginç olan şu ki, seçiminizi değiştirirseniz kazanma olasılığınız 2/3'e yükseliyor! İlk seçiminizde kalırsanız kazanma olasılığınız 1/3'te kalıyor.

## 🌟 Özellikler

- İnteraktif oyun deneyimi
- Detaylı istatistikler
- Otomatik simülasyon özelliği
- Türkçe ve İngilizce dil desteği
- Gerçek zamanlı sonuçlar
- Mobil uyumlu tasarım

## 🔧 Teknolojiler

- Next.js
- TypeScript
- Tailwind CSS
- Vercel (Deployment)

## 🚀 Nasıl Çalıştırılır

1. Projeyi klonlayın:
\`\`\`bash
git clone https://github.com/dogukandogru/montyhall.git
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

3. Geliştirme sunucusunu başlatın:
\`\`\`bash
npm run dev
\`\`\`

4. Tarayıcınızda http://localhost:3000 adresini açın

## 📊 Neden Kapı Değiştirmek Daha Avantajlı?

İlk seçiminizde 1/3 olasılıkla doğru kapıyı seçtiniz. Bu durumda kapı değiştirmek size kaybettirir.
Ancak 2/3 olasılıkla yanlış kapıyı seçtiniz. Sunucu diğer yanlış kapıyı açtığında, kalan kapı kesinlikle arabayı içeren kapı olacaktır.

Bu yüzden:
- Kapıyı değiştirirseniz: 2/3 olasılıkla kazanırsınız
- İlk seçimde kalırsanız: 1/3 olasılıkla kazanırsınız

Simülasyon bölümünü kullanarak bu istatistikleri kendiniz de test edebilirsiniz!
