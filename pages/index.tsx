import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${jetbrainsMono.variable} min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-[family-name:var(--font-jetbrains-mono)] flex flex-col`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-transparent"
          aria-label="Tema değiştir"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
      <main className="flex-grow container mx-auto px-6 py-8 max-w-7xl flex items-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full" style={{height: '80vh'}}>
          <div className="flex h-full">
            <div className="w-1/4 p-6 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
              <div className="text-center">
                <Image
                  src="/profile-picture.jpg"
                  alt="Geliştirici Adı"
                  width={180}
                  height={180}
                  className="rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">Geliştirici Adı</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Kıdemli Full-Stack Geliştirici</p>
              </div>
              <div className="mt-auto">
                <div className="space-y-2 text-sm mb-4">
                  <p className="flex items-center justify-center"><FaMapMarkerAlt className="mr-2" /> İstanbul, Türkiye</p>
                  <p className="flex items-center justify-center"><FaPhone className="mr-2" /> +90 555 123 4567</p>
                  <p className="flex items-center justify-center"><FaEnvelope className="mr-2" /> gelistirici@email.com</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600 dark:hover:text-blue-400">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600 dark:hover:text-blue-400">
                    <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600 dark:hover:text-blue-400">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-3/4 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 h-full">
                <section className="col-span-2">
                  <h2 className="text-xl font-bold mb-3">Hakkımda</h2>
                  <p className="text-sm leading-relaxed">
                    10+ yıllık deneyime sahip, yenilikçi ve problem çözme odaklı bir full-stack geliştiriciyim. 
                    Karmaşık web uygulamalarını tasarlama, geliştirme ve ölçeklendirme konusunda uzmanlığa sahibim.
                    Agile metodolojileri kullanarak, yüksek performanslı ekiplerde çalışma deneyimim var.
                    Sürekli öğrenmeye ve teknolojik gelişmeleri takip etmeye önem veriyorum.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold mb-3">Yetenekler</h2>
                  <div className="flex flex-wrap">
                    {["JavaScript", "TypeScript", "React", "Node.js", "Python", "Docker", "AWS", "GraphQL", "MongoDB", "PostgreSQL"].map((skill) => (
                      <span key={skill} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{skill}</span>
                    ))}
                  </div>
                </section>
                <section className="col-span-2">
                  <h2 className="text-xl font-bold mb-3">Projelerim</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">E-Ticaret Platformu</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">React, Node.js, MongoDB</p>
                      <p className="text-sm">Yüksek performanslı, ölçeklenebilir bir e-ticaret platformu. Özellikler: Kullanıcı kimlik doğrulama, ürün arama, sepet yönetimi, ödeme entegrasyonu.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Task Yönetim Uygulaması</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Vue.js, Express, PostgreSQL</p>
                      <p className="text-sm">Ekip çalışmasını kolaylaştıran bir görev yönetim uygulaması. Özellikler: Gerçek zamanlı güncellemeler, görev atama, ilerleme takibi, takvim entegrasyonu.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Yapay Zeka Destekli Chatbot</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Python, TensorFlow, Flask</p>
                      <p className="text-sm">Müşteri hizmetleri için geliştirilmiş yapay zeka destekli chatbot. Özellikler: Doğal dil işleme, öğrenme yeteneği, çoklu dil desteği.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-3 text-sm">
        <p>&copy; {new Date().getFullYear()} Geliştirici Adı. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
