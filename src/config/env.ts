export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  dbClient: process.env.DB_CLIENT ?? 'sqlite3',
  dbUrl: process.env.DB_URL ?? 'file:./dev.db',
  adminEmail: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
};
