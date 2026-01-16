import { PrismaMariaDb } from '@prisma/adapter-mariadb';

export function createAdapterFromUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  return new PrismaMariaDb({
    host: url.hostname,
    port: parseInt(url.port, 10),
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    connectTimeout: 10000,
    acquireTimeout: 10000,
    connectionLimit: 5
  });
}