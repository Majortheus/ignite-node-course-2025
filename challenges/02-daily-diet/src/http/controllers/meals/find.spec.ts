import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find meal by id', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const createdMeal = await prisma.meal.create({
      data: {
        name: `Meal 1`,
        description: `Meal 1`,
        eaten_at: new Date(),
        wasInDiet: true,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .get(`/meals/${createdMeal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.meal.id).toEqual(createdMeal.id)
    expect(response.body.meal.name).toEqual('Meal 1')
  })
})
