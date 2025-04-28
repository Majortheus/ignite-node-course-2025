import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(orgsRepository, petsRepository)

  return useCase
}
