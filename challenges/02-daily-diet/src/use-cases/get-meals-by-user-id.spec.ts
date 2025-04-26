import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMealsByUserIdUseCase } from './get-meals-by-user-id'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetMealsByUserIdUseCase

describe('Get Meals By User Id Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealsByUserIdUseCase(mealsRepository, usersRepository)
  })

  it('should be able to get all meals by user id', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    for (let i = 0; i < 10; i++) {
      await mealsRepository.create({
        name: `Meal ${i + 1}`,
        description: `Meal ${i + 1}`,
        eaten_at: new Date(),
        wasInDiet: true,
        user_id: createdUser.id,
      })
    }

    const { meals } = await sut.execute({
      userId: createdUser.id,
    })

    expect(meals).toHaveLength(10)
  })

  it('should not be able to get meals with non existing user id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
