import { PrismaClient } from '@prisma/client';
import { createAdapterFromUrl } from '../lib/db.js';

const prisma = new PrismaClient({
  adapter: createAdapterFromUrl(process.env.DATABASE_URL)
});

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const scategories = await prisma.scategories.findMany({
        include: { articles: { select: { designation: true } } }
      });
      return res.status(200).json(scategories);
    }

    if (method === 'POST') {
      const { designation, marque, reference, qtestock, prix, imageart, scategorieID } = req.body;
      const scategories = await prisma.scategories.create({
        data: { designation, marque, reference, qtestock, prix, imageart, scategorieID }
      });
      return res.status(201).json(scategories);
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