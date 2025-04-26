import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const originalMeal = await prisma.meal.create({
      data: {
        name: 'Salada de alface',
        description: 'Salada de alface',
        eaten_at: new Date(),
        wasInDiet: true,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .put(`/meals/${originalMeal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Salada de alface com tomate',
        description: 'Salada de alface com tomate',
        eaten_at: new Date(),
        wasInDiet: true,
      })

    const updatedMeal = await prisma.meal.findFirstOrThrow({
      where: {
        id: originalMeal.id,
      },
    })

    expect(response.statusCode).toEqual(204)
    expect(updatedMeal.name).toEqual('Salada de alface com tomate')
  })
})
