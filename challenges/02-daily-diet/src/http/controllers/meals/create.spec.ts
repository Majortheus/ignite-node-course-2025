import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Salada de alface',
        description: 'Salada de alface',
        eaten_at: new Date(),
        wasInDiet: true,
      })

    const meals = await prisma.meal.count()

    expect(response.statusCode).toEqual(201)
    expect(meals).toEqual(1)
  })
})
