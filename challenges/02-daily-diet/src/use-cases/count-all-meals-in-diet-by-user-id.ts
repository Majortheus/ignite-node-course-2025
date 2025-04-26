import { MealsRepository } from '@/repositories/meals-repository'

interface CountAllMealsInDietByUserIdUseCaseRequest {
  userId: string
}

interface CountAllMealsInDietByUserIdUseCaseResponse {
  allMealsInDietCount: number
}

export class CountAllMealsInDietByUserIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: CountAllMealsInDietByUserIdUseCaseRequest): Promise<CountAllMealsInDietByUserIdUseCaseResponse> {
    const allMealsInDietCount =
      await this.mealsRepository.countMealsByUserIdAndWasInDiet(userId, true)

    return {
      allMealsInDietCount,
    }
  }
}
