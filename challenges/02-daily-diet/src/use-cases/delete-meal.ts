import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ mealId, userId }: DeleteMealUseCaseRequest) {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal || meal.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(meal.id)

    return {
      meal,
    }
  }
}
