# Modern Portföyo Web Sitesi

![Portfolio Screenshot 1](portfolio.png)

Bu proje, Next.js, TypeScript, Tailwind CSS ve MongoDB kullanılarak oluşturulmuş dinamik bir portföyo web sitesidir.

## Özellikler

- Responsive tasarım
- Karanlık/Aydınlık mod
- Dinamik içerik yönetimi
- GitHub entegrasyonu
- İletişim formu
- Admin paneli

## Kurulum

1. Repoyu klonlayın:
   ```
   git clone https://github.com/kullaniciadi/portfolio.git
   ```

2. Bağımlılıkları yükleyin:
   ```
   cd portfolio
   npm install
   ```

3. `.env.local` dosyası oluşturun ve gerekli ortam değişkenlerini ekleyin:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GITHUB_TOKEN=your_github_personal_access_token
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_HOST_USER=your_email
   EMAIL_HOST_PASSWORD=your_email_password
   ```

4. Geliştirme sunucusunu başlatın:
   ```
   npm run dev
   ```

5. Tarayıcınızda `http://localhost:3000` adresine gidin.

## Kullanım

- Ana sayfa: Portföyo içeriğinizi görüntüleyin.
- Admin paneli: `/admin/update` sayfasından içeriğinizi güncelleyin.

## Dağıtım

Projeyi Vercel veya benzeri bir platformda dağıtabilirsiniz. Dağıtım öncesinde `.env` değişkenlerini platform üzerinde ayarlamayı unutmayın.

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Dalınıza push yapın (`git push origin feature/AmazingFeature`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.
