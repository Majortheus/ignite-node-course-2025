import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-orgs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pets', async () => {
    const { token } = await createAndAuthenticateOrgs(app)

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
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
      })

    const pets = await prisma.pet.count()

    expect(response.statusCode).toEqual(201)
    expect(pets).toEqual(1)
  })

  it('should not be able to create pet without authentication', async () => {
    const response = await request(app.server)
      .post(`/pets`)
      .send({
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
      })

    expect(response.statusCode).toEqual(401)
  })
})
