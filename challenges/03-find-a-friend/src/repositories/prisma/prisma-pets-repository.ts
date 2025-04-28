import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { FindaAllFilters, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findAll(filters: FindaAllFilters): Promise<Partial<Pet>[]> {
    const pets = await prisma.pet.findMany({
      select: {
        name: true,
        about: true,
        photos_url: true,
      },
      where: {
        age: filters.age,
        energy: filters.energy,
        environment: filters.environment,
        independent: filters.independent,
        type: filters.type,
        size: filters.size,
        Organization: {
          city: filters.city,
        },
      },
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
