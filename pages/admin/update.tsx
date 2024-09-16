import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  projects: Array<{
    title: string;
    tech: string;
    description: string;
  }>;
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
    projects: [],
    contact: { location: '', phone: '', email: '' },
    profileImage: '',
    socialLinks: { github: '', linkedin: '', twitter: '' },
  });
  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({ title: '', tech: '', description: '' });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPortfolioData();
  }, []);

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

  const handleAddProject = () => {
    if (newProject.title && newProject.tech && newProject.description) {
      setPortfolioData((prev) => ({ ...prev, projects: [...prev.projects, newProject] }));
      setNewProject({ title: '', tech: '', description: '' });
    }
  };

  const handleRemoveProject = (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      console.log('Profile image selected:', file.name);
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
    try {
      const formData = new FormData();
      formData.append('portfolioData', JSON.stringify({
        ...portfolioData,
        profileImage: previewImage || portfolioData.profileImage,
      }));
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axios.post('/api/portfolio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('API response:', response.data);
      alert('Portfolyo başarıyla güncellendi!');
      router.push('/');
    } catch (error) {
      console.error('Portfolyo güncellenirken hata oluştu:', error);
      if (axios.isAxiosError(error)) {
        console.error('Hata detayları:', error.response?.data);
      }
      alert('Portfolyo güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Portfolyo Güncelleme</h1>
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
          <label className="block text-lg font-medium text-gray-700">Projeler</label>
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="mb-4 p-3 border rounded shadow-sm">
              <h3 className="font-bold text-lg text-gray-700">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.tech}</p>
              <p className="mt-1 text-gray-700">{project.description}</p>
              <button
                type="button"
                onClick={() => handleRemoveProject(index)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Kaldır
              </button>
            </div>
          ))}
          <div className="space-y-2 border-t pt-4">
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Proje başlığı"
              className="w-full p-2 border rounded shadow-sm text-gray-700"
            />
            <input
              type="text"
              value={newProject.tech}
              onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
              placeholder="Kullanılan teknolojiler"
              className="w-full p-2 border rounded shadow-sm text-gray-700"
            />
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Proje açıklaması"
              className="w-full p-2 border rounded shadow-sm text-gray-700"
              rows={3}
            />
            <button
              type="button"
              onClick={handleAddProject}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Proje Ekle
            </button>
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

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium">
          Portfolyoyu Güncelle
        </button>
      </form>
    </div>
  );
}


