import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to get all pets by city', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: 'MEDIUM',
        age: 'ADULT',
        energy: 'HIGH',
        environment: 'LARGE',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
    })

    expect(pets).toHaveLength(10)
  })

  it('should not be able to get pets with different city', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: 'MEDIUM',
        age: 'ADULT',
        energy: 'HIGH',
        environment: 'LARGE',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(0)
  })

  it('should be able to filter pets by type', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: i % 2 === 0 ? 'DOG' : 'CAT',
        size: 'MEDIUM',
        age: 'ADULT',
        energy: 'HIGH',
        environment: 'LARGE',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
      type: 'DOG',
    })

    expect(pets).toHaveLength(5)
  })

  it('should be able to filter pets by size', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: i % 2 === 0 ? 'MEDIUM' : 'TINY',
        age: 'ADULT',
        energy: 'HIGH',
        environment: 'LARGE',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
      size: 'MEDIUM',
    })

    expect(pets).toHaveLength(5)
  })

  it('should be able to filter pets by age', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: 'MEDIUM',
        age: i % 2 === 0 ? 'ADULT' : 'BABY',
        energy: 'HIGH',
        environment: 'LARGE',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
      age: 'ADULT',
    })

    expect(pets).toHaveLength(5)
  })

  it('should be able to filter pets by energy', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: 'MEDIUM',
        age: 'ADULT',
        energy: i % 2 === 0 ? 'HIGH' : 'LOW',
        environment: 'LARGE',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
      energy: 'HIGH',
    })

    expect(pets).toHaveLength(5)
  })

  it('should be able to filter pets by environment', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: 'MEDIUM',
        age: 'ADULT',
        energy: 'HIGH',
        environment: i % 2 === 0 ? 'LARGE' : 'SMALL',
        independent: 'HIGH',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
      environment: 'LARGE',
    })

    expect(pets).toHaveLength(5)
  })

  it('should be able to filter pets by independent', async () => {
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

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i + 1}`,
        about: 'Pet about',
        type: 'DOG',
        size: 'MEDIUM',
        age: 'ADULT',
        energy: 'HIGH',
        environment: 'LARGE',
        independent: i % 2 === 0 ? 'HIGH' : 'LOW',
        organization_id: createdOrg.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Guarulhos',
      independent: 'HIGH',
    })

    expect(pets).toHaveLength(5)
  })
})
