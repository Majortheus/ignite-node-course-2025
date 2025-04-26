import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Meal } from '@prisma/client'
import { UserDoesntExistsError } from './errors/user-doesnt-exists-error'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  eaten_at: Date
  wasInDiet: boolean
  user_id: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    description,
    eaten_at,
    wasInDiet,
    user_id,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserDoesntExistsError()
    }

    const meal = await this.mealsRepository.create({
      name,
      description,
      eaten_at,
      wasInDiet,
      user_id,
    })

    return {
      meal,
    }
  }
}
