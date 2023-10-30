import request from 'supertest'
import express from 'express'
import Redis from 'ioredis'
import { createServer } from 'http'
import User, { UserDocument } from '../../api/model/user'
import app from '../../api/app'

let redisClient: Redis
let server: ReturnType<typeof createServer>

describe('Team Routes', () => {
  let authAdminToken: string

  beforeAll(async () => {
    redisClient = new Redis({
      host: process.env.REDIS_HOST,
    })

    const userObject: UserDocument = new User({
      fullname: 'AdminTest',
      email: 'admin@test.com',
      password: 'yourpassword',
      isAdmin: true,
    })

    const auth = userObject.generateAuthToken()
    authAdminToken = `Bearer ${auth}`

    // Create the HTTP server and start it
    server = createServer(app)
    server.listen()
  })

  afterAll(async () => {
    // Properly close the Redis client
    await redisClient.quit()

    // Close the HTTP server
    server.close()
  })

  const teamPayload = {
    name: 'Super Facolnssyyi',
    country: 'Nigeria',
    founded: 1994,
  }

  it('should resond 401 Unauthorized', async () => {
    const response = await request(app)
      .post('/team/')
      .send(teamPayload)
      .expect('Content-Type', /json/)
      .expect(401)

    // Add more assertions as needed
  })
})
