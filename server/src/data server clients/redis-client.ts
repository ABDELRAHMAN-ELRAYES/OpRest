import { createClient, RedisClientType } from "redis";
import config from "../config/config";

// Define Redis client
class Redis {
  private static RedisClient: RedisClientType | null = null;
  private constructor() {}

  static getRedisClient(): RedisClientType {
    if (!this.RedisClient) {
      this.RedisClient = createClient({ url: config.redis.url });
      this.RedisClient.connect().catch(console.error);
    }
    return this.RedisClient;
  }
}
export default Redis;
