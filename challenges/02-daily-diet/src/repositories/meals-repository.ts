import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  findManyByUserId(userId: string): Promise<Meal[]>
  countAllMealsByUserId(userId: string): Promise<number>
  countMealsByUserIdAndWasInDiet(
    userId: string,
    wasInDiet: boolean,
  ): Promise<number>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(data: Meal): Promise<Meal>
  delete(id: string): Promise<void>
}
