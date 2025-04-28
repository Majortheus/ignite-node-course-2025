import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindaAllFilters, PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-ongs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findAll({
    city,
    age,
    energy,
    environment,
    independent,
    type,
    size,
  }: FindaAllFilters): Promise<Partial<Pet>[]> {
    const orgsIdByCity = this.orgsRepository.items
      .filter((org) => org.city === city)
      .map((org) => org.id)

    const pets = this.items
      .filter((pet) => orgsIdByCity.includes(pet.organization_id))
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) => (type ? pet.type === type : true))
      .filter((pet) => (size ? pet.size === size : true))
      .filter((pet) => (energy ? pet.energy === energy : true))
      .filter((pet) => (environment ? pet.environment === environment : true))
      .filter((pet) => (independent ? pet.independent === independent : true))

    return pets.map((pet) => ({
      name: pet.name,
      about: pet.about,
      photos_url: pet.photos_url,
    }))
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      type: data.type,
      size: data.size,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      independent: data.independent,
      organization_id: data.organization_id,
      photos_url: Array.isArray(data.photos_url) ? data.photos_url : [],
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
    }

    this.items.push(pet)

    return pet
  }
}
