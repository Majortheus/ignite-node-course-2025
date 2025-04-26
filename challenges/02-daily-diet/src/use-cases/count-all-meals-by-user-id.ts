import { MealsRepository } from '@/repositories/meals-repository'

interface CountAllMealsByUserIdUseCaseRequest {
  userId: string
}

interface CountAllMealsByUserIdUseCaseResponse {
  allMealsCount: number
}

export class CountAllMealsByUserIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: CountAllMealsByUserIdUseCaseRequest): Promise<CountAllMealsByUserIdUseCaseResponse> {
    const allMealsCount = await this.mealsRepository.countAllMealsByUserId(
      userId,
    )

    return {
      allMealsCount,
    }
  }
}
