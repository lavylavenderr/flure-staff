import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    MAIN_DATABASE_URL: z.string(),
    DISCORD_CLIENTID: z.string(),
    DISCORD_CLIENTSECRET: z.string(),
    DISCORD_REDIRECT_URL: z.string(),
    ROBLOX_COOKIE: z.string(),
    DISCORD_TOKEN: z.string()
})

type env = z.infer<typeof envSchema>
export const env = envSchema.parse(process.env)