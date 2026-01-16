// prisma.config.ts (à la racine du projet)
import "dotenv/config"; // Charge les variables d'environnement (très important sur Vercel)
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!, // le ! dit à TypeScript que c'est non-null (Vercel le gère)
  },
});