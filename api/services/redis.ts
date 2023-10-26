import * as redis from 'redis'
import { log, Log } from '../utilis/logger'

const client = redis.createClient({ url: `${process.env.REDIS_URL}` })
client.on('error', (err) => console.log(err))
client.on('connect', () => console.log('Redis connected'))

export const RedisService = {
  async setJson(key: any, value: any): Promise<any> {
    const jsonValue = JSON.stringify(value)
    // Store the JSON string in Redis
    const result = await client.set(key, jsonValue)
    return result
  },
}
