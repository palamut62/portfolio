import clientPromise from '../../lib/mongodb'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import { parse } from 'querystring';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("myportfolio")

  switch (req.method) {
    case 'GET':
      try {
        const portfolio = await db.collection('portfolios').findOne()
        res.status(200).json(portfolio)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch portfolio data' })
      }
      break

    case 'POST':
      try {
        const form = new IncomingForm()
        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error('Form parsing error:', err);
            return res.status(500).json({ error: 'Parsing form failed' })
          }

          let portfolioData;
          try {
            portfolioData = JSON.parse(fields.portfolioData);
          } catch (error) {
            console.error('JSON parsing error:', error);
            return res.status(400).json({ error: 'Invalid portfolioData JSON' });
          }

          if (files.profileImage && files.profileImage.filepath) {
            try {
              const oldPath = files.profileImage.filepath;
              const fileName = files.profileImage.originalFilename || 'profile-picture.jpg';
              const newPath = path.join(process.cwd(), 'public', 'uploads', fileName);
              fs.copyFileSync(oldPath, newPath);
              portfolioData.profileImage = `/uploads/${fileName}`;
              console.log('Profile image uploaded:', portfolioData.profileImage);
            } catch (error) {
              console.error('File processing error:', error);
            }
          } else {
            console.log('No profile image uploaded');
          }

          try {
            // Mevcut veriyi al
            const existingPortfolio = await db.collection('portfolios').findOne();
            
            // Yeni veriyi mevcut veri ile birleştir
            const updatedPortfolio = {
              ...existingPortfolio,
              ...portfolioData,
              profileImage: portfolioData.profileImage || existingPortfolio?.profileImage,
              socialLinks: {
                ...existingPortfolio?.socialLinks,
                ...portfolioData.socialLinks
              }
            };

            // _id alanını kaldır
            delete updatedPortfolio._id;

            const result = await db.collection('portfolios').updateOne(
              {},
              { $set: updatedPortfolio },
              { upsert: true }
            )
            console.log('Updated portfolio:', updatedPortfolio);
            res.status(200).json({ success: true, result })
          } catch (error) {
            console.error('Database update error:', error);
            res.status(500).json({ error: 'Failed to update portfolio data in database' })
          }
        })
      } catch (error) {
        console.error('General error:', error);
        res.status(500).json({ error: 'Failed to update portfolio data' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}