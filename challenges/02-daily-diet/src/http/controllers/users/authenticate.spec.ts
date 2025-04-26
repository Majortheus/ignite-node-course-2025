import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong password', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe-valid@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe-valid@example.com',
      password: '123123',
    })

    expect(response.statusCode).toEqual(400)
  })

  it('should not be able to authenticate without password', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe-without-password@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe-without-password@example.com',
    })

    expect(response.statusCode).toEqual(400)
  })
})
