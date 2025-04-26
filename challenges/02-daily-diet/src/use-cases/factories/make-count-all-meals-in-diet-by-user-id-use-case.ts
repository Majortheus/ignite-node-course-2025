import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountAllMealsInDietByUserIdUseCase } from '../count-all-meals-in-diet-by-user-id'

export function makeCountAllMealsInDietByUserIdUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CountAllMealsInDietByUserIdUseCase(mealsRepository)

  return useCase
}
