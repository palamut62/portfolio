import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link'; // Link bileşenini ekleyin

interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  contact: {
    location: string;
    phone: string;
    email: string;
  };
  profileImage?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export default function UpdatePortfolio() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: '',
    title: '',
    about: '',
    skills: [],
    contact: { location: '', phone: '', email: '' },
    profileImage: '',
    socialLinks: { github: '', linkedin: '', twitter: '' },
  });
  const [newSkill, setNewSkill] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Sadece geliştirme ortamında ve localhost'ta çalışmasını sağla
    if (process.env.NODE_ENV !== 'development' || typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
      router.push('/');
    } else {
      fetchPortfolioData();
    }
  }, [router]);

  // Eğer geliştirme ortamında değilse veya localhost değilse, hiçbir şey render etme
  if (process.env.NODE_ENV !== 'development' || typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return null;
  }

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get<PortfolioData>('/api/portfolio');
      setPortfolioData({
        ...response.data,
        socialLinks: response.data.socialLinks || { github: '', linkedin: '', twitter: '' }
      });
      if (response.data.profileImage) {
        setPreviewImage(response.data.profileImage);
      }
    } catch (error) {
      console.error('Portfolyo verisi alınamadı:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
  };

  const handleAddSkill = () => {
    if (newSkill) {
      setPortfolioData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPortfolioData(prev => ({ ...prev, profileImage: base64String }));
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('portfolioData', JSON.stringify(portfolioData));
    // Diğer form alanlarını ekleyin...

    try {
      const response = await axios.post('/api/portfolio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('API response:', response.data);
      alert('Portfolyo başarıyla güncellendi!');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Portfolyo güncellenirken hata oluştu:', error.response?.data || error.message);
        alert(`Portfolyo güncellenirken bir hata oluştu: ${error.response?.data?.error || error.message}`);
      } else {
        console.error('Beklenmeyen bir hata oluştu:', error);
        alert('Beklenmeyen bir hata oluştu');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Portfolyo Güncelleme</h1>
        <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Anasayfa
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Profil Resmi</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-gray-700" />
          {previewImage && (
            <Image src={previewImage} alt="Profil Resmi Önizleme" width={100} height={100} className="rounded-full mt-2" />
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">İsim</label>
          <input
            type="text"
            name="name"
            value={portfolioData.name}
            onChange={handleInputChange}
            placeholder="Adınız Soyadınız"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Ünvan</label>
          <input
            type="text"
            name="title"
            value={portfolioData.title}
            onChange={handleInputChange}
            placeholder="Örn: Yazılım Geliştirici"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Hakkımda</label>
          <textarea
            name="about"
            value={portfolioData.about}
            onChange={handleInputChange}
            placeholder="Kendiniz hakkında kısa bir açıklama yazın"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Yetenekler</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow p-2 border rounded shadow-sm text-gray-700"
              placeholder="Yeni yetenek ekle"
            />
            <button type="button" onClick={handleAddSkill} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Ekle
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.map((skill) => (
              <div key={skill} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                <span className="text-gray-700">{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-red-500 font-bold hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">İletişim Bilgileri</label>
          <input
            type="text"
            name="location"
            value={portfolioData.contact.location}
            onChange={handleContactChange}
            placeholder="Konum"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
          <input
            type="text"
            name="phone"
            value={portfolioData.contact.phone}
            onChange={handleContactChange}
            placeholder="Telefon"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
          <input
            type="email"
            name="email"
            value={portfolioData.contact.email}
            onChange={handleContactChange}
            placeholder="E-posta"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Sosyal Medya Bağlantıları</label>
          <input
            type="text"
            name="github"
            value={portfolioData.socialLinks?.github || ''}
            onChange={handleSocialLinkChange}
            placeholder="GitHub URL"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
          <input
            type="text"
            name="linkedin"
            value={portfolioData.socialLinks?.linkedin || ''}
            onChange={handleSocialLinkChange}
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
          <input
            type="text"
            name="twitter"
            value={portfolioData.socialLinks?.twitter || ''}
            onChange={handleSocialLinkChange}
            placeholder="Twitter URL"
            className="w-full p-2 border rounded shadow-sm text-gray-700"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Anasayfa
          </Link>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium">
            Portfolyoyu Güncelle
          </button>
        </div>
      </form>
    </div>
  );
}


