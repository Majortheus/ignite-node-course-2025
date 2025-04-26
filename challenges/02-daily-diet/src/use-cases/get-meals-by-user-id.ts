import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Meal } from '@prisma/client'

interface GetMealsByUserIdUseCaseRequest {
  userId: string
}

interface GetMealsByUserIdUseCaseResponse {
  meals: Meal[]
}

export class GetMealsByUserIdUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetMealsByUserIdUseCaseRequest): Promise<GetMealsByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meals = await this.mealsRepository.findManyByUserId(userId)

    return {
      meals,
    }
  }
}
