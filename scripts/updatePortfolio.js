// scripts/updatePortfolio.js
const axios = require('axios')

const updatePortfolio = async () => {
  const portfolioData = {
    name: "Umut ÇELİK",
    title: "Civil Engineer and Software Developer",
    about: "I'm a civil engineer specializing in hydraulics. I've been developing software as a hobby for 5+ years, with various projects on GitHub. I combine my engineering knowledge and software skills to create innovative solutions.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Docker", "AWS", "GraphQL", "MongoDB", "PostgreSQL"],
    projects: [
      {
        title: "E-Commerce Platform",
        tech: "React, Node.js, MongoDB",
        description: "A high-performance, scalable e-commerce platform with features including user authentication, product search, cart management, and payment integration."
      },
      // ... diğer projeler
    ],
    contact: {
      location: "Tunceli, Turkey",
      phone: "+90 000 000 0000",
      email: "umutcelik6230@gmail.com"
    }
  }

  try {
    const response = await axios.post('http://localhost:3000/api/portfolio', portfolioData)
    console.log('Portfolio updated successfully:', response.data)
  } catch (error) {
    console.error('Failed to update portfolio:', error)
  }
}

updatePortfolio()