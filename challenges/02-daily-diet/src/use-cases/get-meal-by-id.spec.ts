import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMealByIdUseCase } from './get-meal-by-id'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetMealByIdUseCase

describe('Get Meal By Id Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealByIdUseCase(mealsRepository)
  })

  it('should be able to get meal by id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const meal = await mealsRepository.create({
      name: 'Salada de alface',
      description: 'Salada de alface',
      eaten_at: new Date(),
      wasInDiet: true,
      user_id: user.id,
    })

    const { meal: mealById } = await sut.execute({
      mealId: meal.id,
      userId: user.id,
    })

    expect(mealById).toEqual(meal)
  })

  it('should not be able to get meal with non existing id', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'non-existing-id',
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get meal with non existing user id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const meal = await mealsRepository.create({
      name: 'Salada de alface',
      description: 'Salada de alface',
      eaten_at: new Date(),
      wasInDiet: true,
      user_id: user.id,
    })

    await expect(() =>
      sut.execute({
        mealId: meal.id,
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
