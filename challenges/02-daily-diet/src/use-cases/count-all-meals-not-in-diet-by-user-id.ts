import { MealsRepository } from '@/repositories/meals-repository'

interface CountAllMealsNotInDietByUserIdUseCaseRequest {
  userId: string
}

interface CountAllMealsNotInDietByUserIdUseCaseResponse {
  allMealsNotInDietCount: number
}

export class CountAllMealsNotInDietByUserIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: CountAllMealsNotInDietByUserIdUseCaseRequest): Promise<CountAllMealsNotInDietByUserIdUseCaseResponse> {
    const allMealsNotInDietCount =
      await this.mealsRepository.countMealsByUserIdAndWasInDiet(userId, false)

    return {
      allMealsNotInDietCount,
    }
  }
}
