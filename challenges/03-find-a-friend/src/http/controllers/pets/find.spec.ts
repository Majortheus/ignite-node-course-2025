import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-orgs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find pet by id', async () => {
    const { token } = await createAndAuthenticateOrgs(app)

    const org = await prisma.organization.findFirstOrThrow()

    const createdPet = await prisma.pet.create({
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

    const response = await request(app.server)
      .get(`/pets/${createdPet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.id).toEqual(createdPet.id)
    expect(response.body.pet.name).toEqual('Ted')
  })

  it('should not be able to find pet with non existing id', async () => {
    const { token } = await createAndAuthenticateOrgs(app)

    const response = await request(app.server)
      .get(`/pets/cma0ggc4m000008l1c41g5pnl`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(404)
  })
})
