import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountAllMealsNotInDietByUserIdUseCase } from '../count-all-meals-not-in-diet-by-user-id'

export function makeCountAllMealsNotInDietByUserIdUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CountAllMealsNotInDietByUserIdUseCase(mealsRepository)

  return useCase
}
