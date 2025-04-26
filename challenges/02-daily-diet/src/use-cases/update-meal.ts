import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateMealUseCaseRequest {
  id: string
  name: string
  description: string
  eaten_at: Date
  wasInDiet: boolean
  userId: string
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    name,
    description,
    eaten_at,
    wasInDiet,
    userId,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(id)

    if (!meal || meal.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    meal.name = name
    meal.description = description
    meal.eaten_at = eaten_at
    meal.wasInDiet = wasInDiet

    await this.mealsRepository.update(meal)

    return {
      meal,
    }
  }
}
