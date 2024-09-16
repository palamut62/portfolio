'use client'

import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export function Index() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('about');

  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

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

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const sectionRef = {
      about: aboutRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    }[sectionId];

    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${jetbrainsMono.variable} min-h-screen bg-white text-gray-800 font-mono`}>
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <nav>
            <ul className="flex space-x-4">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeSection === item.toLowerCase()
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
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
            className="p-2 rounded-full bg-gray-200"
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
      <main className="container mx-auto px-6 py-8 max-w-4xl mt-20">
        <div className="space-y-20">
          <section className="text-center">
            <Image
              src="/profile-picture.jpg"
              alt="John Doe"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h2 className="text-3xl font-bold mb-2">John Doe</h2>
            <p className="text-xl text-gray-600 mb-4">Senior Full-Stack Developer</p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors">
                <FaTwitter />
              </a>
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-blue-500" /> Istanbul, Turkey</p>
              <p className="flex items-center"><FaPhone className="mr-2 text-blue-500" /> +90 555 123 4567</p>
              <p className="flex items-center"><FaEnvelope className="mr-2 text-blue-500" /> john.doe@email.com</p>
            </div>
          </section>

          <motion.section
            ref={aboutRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-lg leading-relaxed">
              With over 10 years of experience, I am an innovative and solution-driven full-stack developer. 
              I specialize in designing, developing, and scaling complex web applications. 
              My expertise lies in working with Agile methodologies and leading high-performance teams. 
              I am passionate about continuous learning and staying at the forefront of technological advancements.
            </p>
          </motion.section>

          <motion.section
            ref={skillsRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["JavaScript", "TypeScript", "React", "Node.js", "Python", "Docker", "AWS", "GraphQL", "MongoDB", "PostgreSQL"].map((skill) => (
                <div key={skill} className="bg-gray-100 rounded-lg p-3 text-center">
                  <span className="font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            ref={projectsRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="space-y-6">
              {[
                {
                  title: "E-Commerce Platform",
                  tech: "React, Node.js, MongoDB",
                  description: "A high-performance, scalable e-commerce platform with features including user authentication, product search, cart management, and payment integration."
                },
                {
                  title: "Task Management Application",
                  tech: "Vue.js, Express, PostgreSQL",
                  description: "A collaborative task management application featuring real-time updates, task assignment, progress tracking, and calendar integration."
                },
                {
                  title: "AI-Powered Chatbot",
                  tech: "Python, TensorFlow, Flask",
                  description: "An AI-powered chatbot for customer service with natural language processing, learning capabilities, and multi-language support."
                }
              ].map((project, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-blue-500 text-sm mb-2">{project.tech}</p>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            ref={contactRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Send Message
              </button>
            </form>
          </motion.section>
        </div>
      </main>
      <footer className="bg-white shadow-md mt-20">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}