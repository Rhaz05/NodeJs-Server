import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  SERVER_IS_HTTPS: z
    .string()
    .transform((value) => (value === "true" ? true : false)),
  SERVER_SESSION_SECRET: z.string(),
  MONGODB_URL: z.string(),
  PORT: z.coerce.number(),
});

const validatedEnv = envSchema.safeParse(process.env);

if (!validatedEnv.success) {
  throw new Error(JSON.stringify(validatedEnv.error.flatten().fieldErrors));
}

export const CONFIG = {
  NODE_ENV: validatedEnv.data.NODE_ENV,
  DB_HOST: validatedEnv.data.DB_HOST,
  DB_USER: validatedEnv.data.DB_USER,
  DB_PASSWORD: validatedEnv.data.DB_PASSWORD,
  DB_DATABASE: validatedEnv.data.DB_DATABASE,
  SERVER_IS_HTTPS: validatedEnv.data.SERVER_IS_HTTPS,
  SERVER_SESSION_SECRET: validatedEnv.data.SERVER_SESSION_SECRET,
  MONGODB_URL: validatedEnv.data.MONGODB_URL,
  PORT: validatedEnv.data.PORT,
};
