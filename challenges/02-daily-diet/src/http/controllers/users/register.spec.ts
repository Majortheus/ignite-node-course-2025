import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able not be able to register with same email twice', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(409)
  })

  it('should not be able to register without email', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)
  })
})
