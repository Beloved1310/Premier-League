import Redis from 'ioredis';

const client = new Redis({
  host: process.env.REDIS_HOST,
  // port: parseInt(process.env.REDIS_PORT),
});

client.on('error', (err) => console.log(err));
client.on('connect', () => console.log('Redis connected'));

export const RedisService = {

  async getUserByEmail(email: string){
    
  },
  async setJson(key: string, value: any): Promise<any> {
    const jsonValue = JSON.stringify(value);
    await client.set(key, jsonValue, 'EX', 3600); // Set a 1-hour expiration time (adjust as needed)
    return true;
  },

  async getJson(key: string): Promise<any> {
    const result = await client.get(key);
    return result ? JSON.parse(result) : null;
  },

  async deleteJson(key: string): Promise<any> {
    // Delete the specified key from Redis
    const result = await client.del(key);
    return result;
  },
};
