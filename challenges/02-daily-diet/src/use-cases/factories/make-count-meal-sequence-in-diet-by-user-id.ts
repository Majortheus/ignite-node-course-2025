import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealSequenceInDietByUserIdUseCase } from '../count-meal-sequence-in-diet-by-user-id'

export function makeCountMealSequenceInDietByUserIdUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CountMealSequenceInDietByUserIdUseCase(mealsRepository)

  return useCase
}
