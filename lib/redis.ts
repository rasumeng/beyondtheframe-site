import { Redis } from '@upstash/redis';

function createRedisClient() {
  // Upstash SDK env vars
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  // Vercel KV integration env vars
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }
  // Fallback to fromEnv (may throw if neither is set)
  return Redis.fromEnv();
}

export const redis = createRedisClient();