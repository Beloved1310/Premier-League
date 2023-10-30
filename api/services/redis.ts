import Redis from 'ioredis'
import { createClient } from 'redis'
import { log, Log } from '../utilis/logger'
import { config } from '../config'

const client = createClient({
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
})
client.connect()
client.on('error', (err) => console.log(err))
client.on('connect', () => log(Log.bg.green, 'Redis connected'))

export const RedisService = {
  async setJson(key: string, value: any, duration: number): Promise<any> {
    const jsonValue = JSON.stringify(value)
    await client.set(key, jsonValue)
    await client.expire(key, duration) // Set the expiration time
    return true
  },

  async getJson(key: string): Promise<any> {
    const result = await client.get(key)
    return result ? JSON.parse(result) : null
  },

  async deleteJson(key: string): Promise<any> {
    // Delete the specified key from Redis
    const result = await client.del(key)
    return result
  },
}
