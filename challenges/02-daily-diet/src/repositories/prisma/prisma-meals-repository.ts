import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    return meal
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
    })

    return meals
  }

  async countAllMealsByUserId(userId: string): Promise<number> {
    const meals = await prisma.meal.count({
      where: {
        user_id: userId,
      },
    })

    return meals
  }

  async countMealsByUserIdAndWasInDiet(
    userId: string,
    wasInDiet: boolean,
  ): Promise<number> {
    const meals = await prisma.meal.count({
      where: {
        user_id: userId,
        wasInDiet,
      },
    })

    return meals
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async update(data: Meal): Promise<Meal> {
    const meal = await prisma.meal.update({
      where: {
        id: data.id,
      },
      data,
    })

    return meal
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: {
        id,
      },
    })
  }
}
