import { PrismaClient } from '@prisma/client';
import { createAdapterFromUrl } from '../lib/db.js';

export default async function handler(req, res) {
  console.log('API appelée :', req.method, req.url);
  console.log('DATABASE_URL existe ?', !!process.env.DATABASE_URL);
  console.log('DATABASE_URL value :', process.env.DATABASE_URL || 'MISSING !');

  try {
    console.log('Création adapter...');
    const adapter = createAdapterFromUrl(process.env.DATABASE_URL);
    console.log('Adapter créé');

    console.log('Création PrismaClient...');
    const prisma = new PrismaClient({ adapter });
    console.log('PrismaClient prêt');

    if (req.method === 'GET') {
      const articles = await prisma.articles.findMany();
      return res.status(200).json(articles);
    }

    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Erreur dans handler :', error.message);
    console.error('Stack :', error.stack);
    return res.status(500).json({ error: error.message });
  } finally {
    // await prisma.$disconnect(); // décommente si tu veux
  }
}