import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(id: string) {
    const meal = this.items.find((item) => item.id === id)

    if (!meal) {
      return null
    }

    return meal
  }

  async findManyByUserId(userId: string) {
    const meals = this.items.filter((item) => item.user_id === userId)
    return meals
  }

  async countAllMealsByUserId(userId: string): Promise<number> {
    const meals = this.items.filter((item) => item.user_id === userId)
    return meals.length
  }

  async countMealsByUserIdAndWasInDiet(
    userId: string,
    wasInDiet: boolean,
  ): Promise<number> {
    const meals = this.items.filter(
      (item) => item.user_id === userId && item.wasInDiet === wasInDiet,
    )
    return meals.length
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal: Meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      eaten_at: new Date(data.eaten_at),
      wasInDiet: data.wasInDiet,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(meal)

    return meal
  }

  async update(meal: Meal) {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)

    if (mealIndex >= 0) {
      meal.updated_at = new Date()
      this.items[mealIndex] = meal
    }

    return meal
  }

  async delete(id: string) {
    const mealIndex = this.items.findIndex((item) => item.id === id)

    if (mealIndex >= 0) {
      this.items.splice(mealIndex, 1)
    }
  }
}
