import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Meal metrics  (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get meals metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    for (let i = 0; i < 10; i++) {
      await prisma.meal.create({
        data: {
          name: `Meal ${i + 1}`,
          description: `Meal ${i + 1}`,
          eaten_at: new Date(),
          wasInDiet: true,
          user_id: user.id,
        },
      })
    }

    for (let i = 0; i < 10; i++) {
      await prisma.meal.create({
        data: {
          name: `Meal ${i + 1}`,
          description: `Meal ${i + 1}`,
          eaten_at: new Date(),
          wasInDiet: false,
          user_id: user.id,
        },
      })
    }

    for (let i = 0; i < 5; i++) {
      await prisma.meal.create({
        data: {
          name: `Meal ${i + 1}`,
          description: `Meal ${i + 1}`,
          eaten_at: new Date(),
          wasInDiet: true,
          user_id: user.id,
        },
      })
    }

    const response = await request(app.server)
      .get('/meals/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.allMealsCount).toEqual(25)
    expect(response.body.allMealsInDietCount).toEqual(15)
    expect(response.body.allMealsNotInDietCount).toEqual(10)
    expect(response.body.mealSequenceInDietCount).toEqual(10)
  })
})
