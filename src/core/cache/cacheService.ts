import  { redisClient } from "./upstash";

class cacheService {
  private client: typeof redisClient;

  constructor(client: typeof redisClient) {
    this.client = client;
  }
  async keyExists(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.exists(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply === 1);
      });
    });
  }
  async setVal(key: string, value: any, ttl?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const valueString = JSON.stringify(value);
      if (ttl) {
        this.client.setex(key, ttl, valueString, (err) => {
          if (err) reject(err);
          resolve();
        });
      } else {
        this.client.set(key, valueString, (err) => {
          if (err) reject(err);
          resolve();
        });
      }
    });
  }
  async getVal<T>(key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        if (reply) resolve(JSON.parse(reply));
        else resolve(null);
      });
    });
  }
  async delVal(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

export default new cacheService(redisClient);