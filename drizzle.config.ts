import type { Config } from 'drizzle-kit';
 
export default {
  schema: './src/db/schema',
  driver: 'd1-http',
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN
  },
  out: '.drizzle'
} satisfies Config;
