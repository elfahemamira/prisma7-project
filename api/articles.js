import { PrismaClient } from '@prisma/client';
import { createAdapterFromUrl } from '../lib/db.js';

const prisma = new PrismaClient({
  adapter: createAdapterFromUrl(process.env.DATABASE_URL)
});

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const articles = await prisma.articles.findMany({
        include: { scategories: { select: { nomscategorie: true } } }
      });
      return res.status(200).json(articles);
    }

    if (method === 'POST') {
      const { designation, marque, reference, qtestock, prix, imageart, scategorieID } = req.body;
      const article = await prisma.articles.create({
        data: { designation, marque, reference, qtestock, prix, imageart, scategorieID }
      });
      return res.status(201).json(article);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}