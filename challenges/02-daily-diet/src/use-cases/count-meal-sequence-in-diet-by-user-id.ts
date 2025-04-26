import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealSequenceInDietByUserIdUseCaseRequest {
  userId: string
}

interface CountMealSequenceInDietByUserIdUseCaseResponse {
  mealSequenceInDietCount: number
}

export class CountMealSequenceInDietByUserIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: CountMealSequenceInDietByUserIdUseCaseRequest): Promise<CountMealSequenceInDietByUserIdUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId)

    const mealsCount = meals.reduce(
      (acc, meal) => {
        if (meal.wasInDiet) {
          acc.mealSequenceInDietCount += 1
        } else {
          acc.mealSequenceInDietCount = 0
        }

        if (acc.mealSequenceInDietCount > acc.bestMealSequenceInDietCount) {
          acc.bestMealSequenceInDietCount = acc.mealSequenceInDietCount
        }

        return acc
      },
      {
        mealSequenceInDietCount: 0,
        bestMealSequenceInDietCount: 0,
      },
    )

    return {
      mealSequenceInDietCount: mealsCount.bestMealSequenceInDietCount,
    }
  }
}
