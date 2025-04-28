import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { OrgDoesntExistsError } from './errors/org-doesnt-exists-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      whatsapp: '+5511999999999',
      zipCode: '12345678',
      state: 'SP',
      city: 'Guarulhos',
      neighborhood: 'Centro',
      number: '123',
      street: 'Rua Exemplo',
    })

    const { pet } = await sut.execute({
      organization_id: org.id,
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with not existing organization', async () => {
    await expect(() =>
      sut.execute({
        organization_id: 'not-existing-organization-id',
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
      }),
    ).rejects.toBeInstanceOf(OrgDoesntExistsError)
  })
})
