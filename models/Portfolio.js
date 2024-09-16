// models/Portfolio.js
import mongoose from 'mongoose'

const PortfolioSchema = new mongoose.Schema({
  name: String,
  title: String,
  about: String,
  skills: [String],
  projects: [{
    title: String,
    tech: String,
    description: String
  }],
  contact: {
    location: String,
    phone: String,
    email: String
  },
  profileImage: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  }
})

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema)