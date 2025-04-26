import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountAllMealsByUserIdUseCase } from '../count-all-meals-by-user-id'

export function makeCountAllMealsByUserIdUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CountAllMealsByUserIdUseCase(mealsRepository)

  return useCase
}
