import {
  Pet,
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependent,
  PetSize,
  PetType,
  Prisma,
} from '@prisma/client'

export type FindaAllFilters = {
  city: string
  type?: PetType
  age?: PetAge
  size?: PetSize
  energy?: PetEnergy
  environment?: PetEnvironment
  independent?: PetIndependent
}

export interface PetsRepository {
  findAll(filters: FindaAllFilters): Promise<Partial<Pet>[]>
  findById(id: string): Promise<Pet | null>
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
