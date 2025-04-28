import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetByIdUseCase } from './get-pet-by-id'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get pet by id', async () => {
    const createdOrg = await orgsRepository.create({
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

    const createdPet = await petsRepository.create({
      name: `Ted`,
      about: 'Pet about',
      type: 'DOG',
      size: 'SMALL',
      age: 'ADULT',
      energy: 'HIGH',
      environment: 'MEDIUM',
      independent: 'LOW',
      organization_id: createdOrg.id,
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: createdPet.id,
        size: 'SMALL',
        age: 'ADULT',
        energy: 'HIGH',
        environment: 'MEDIUM',
      }),
    )
  })

  it('should not be able to get pet with non existing id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
