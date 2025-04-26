import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealByIdUseCase } from '../get-meal-by-id'

export function makeGetMealByIdUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetMealByIdUseCase(mealsRepository)

  return useCase
}
