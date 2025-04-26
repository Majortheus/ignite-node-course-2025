import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Meal } from '@prisma/client'

interface GetMealByIdUseCaseRequest {
  mealId: string
  userId: string
}

interface GetMealByIdUseCaseResponse {
  meal: Meal
}

export class GetMealByIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
  }: GetMealByIdUseCaseRequest): Promise<GetMealByIdUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal || meal.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    return {
      meal,
    }
  }
}
