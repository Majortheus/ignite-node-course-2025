import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-orgs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find pets by id', async () => {
    const { token } = await createAndAuthenticateOrgs(app)

    const org = await prisma.organization.findFirstOrThrow()

    for (let i = 0; i < 10; i++) {
      await prisma.pet.create({
        data: {
          name: 'Ted',
          about: 'Ted about',
          age: 'ADULT',
          energy: 'HIGH',
          environment: 'LARGE',
          independent: 'LOW',
          type: 'DOG',
          size: 'SMALL',
          photos_url: [],
          requirements: ['Muito carinho', 'Pouca comida'],
          organization_id: org.id,
        },
      })
    }

    const response = await request(app.server)
      .get(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'Guarulhos',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.length).toEqual(10)
  })
})
