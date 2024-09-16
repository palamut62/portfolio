'use client'

import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";
import axios from 'axios';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('about');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>({
    name: '',
    title: '',
    about: '',
    skills: [],
    projects: [],
    contact: {
      location: '',
      phone: '',
      email: '',
    },
    profileImage: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
    },
  });

  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get<PortfolioData>('/api/portfolio');
        setPortfolioData(response.data);
        console.log('Fetched portfolio data:', response.data);
      } catch (error) {
        console.error('Portfolyo verisi alınamadı:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = [
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
      ];

      for (const section of sections) {
        if (section.ref.current && scrollPosition >= section.ref.current.offsetTop - 100) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || !portfolioData) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const sectionRef = {
      about: aboutRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    }[sectionId];

    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${jetbrainsMono.variable} min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-mono transition-colors duration-200`}>
      <header className="bg-white dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 transition-colors duration-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{portfolioData.name}</h1>
          <nav>
            <ul className="flex space-x-4">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeSection === item.toLowerCase()
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 max-w-4xl pt-24 transition-colors duration-200">
        <div className="space-y-20">
          <section className="text-center">
            <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src={portfolioData.profileImage || "/uploads/default-profile.jpg"}
                alt={portfolioData.name}
                width={192}
                height={192}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">{portfolioData.name}</h2>
            <p className="text-xl text-gray-600 mb-4">{portfolioData.title}</p>
            <div className="flex justify-center space-x-4 mb-6">
              {portfolioData?.socialLinks?.github && (
                <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors">
                  <FaGithub />
                </a>
              )}
              {portfolioData?.socialLinks?.linkedin && (
                <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors">
                  <FaLinkedin />
                </a>
              )}
              {portfolioData?.socialLinks?.twitter && (
                <a href={portfolioData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors">
                  <FaTwitter />
                </a>
              )}
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-blue-500" /> {portfolioData.contact.location}</p>
              <p className="flex items-center"><FaPhone className="mr-2 text-blue-500" /> {portfolioData.contact.phone}</p>
              <p className="flex items-center"><FaEnvelope className="mr-2 text-blue-500" /> {portfolioData.contact.email}</p>
            </div>
          </section>

          <motion.section
            ref={aboutRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-lg leading-relaxed">{portfolioData.about}</p>
          </motion.section>

          <motion.section
            ref={skillsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {portfolioData.skills.map((skill) => (
                <div key={skill} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <span className="font-semibold dark:text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            ref={projectsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="space-y-6">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{project.title}</h3>
                  <p className="text-blue-500 text-sm mb-2">{project.tech}</p>
                  <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            ref={contactRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
              </div>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Send Message
              </button>
            </form>
          </motion.section>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-900 mt-20 transition-colors duration-200">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}