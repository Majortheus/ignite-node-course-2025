import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteMealUseCase } from './delete-meal'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should delete a existing meal', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const originalMeal = await mealsRepository.create({
      name: 'Salada de alface',
      description: 'Salada de alface',
      eaten_at: new Date(),
      wasInDiet: true,
      user_id: user.id,
    })

    await sut.execute({ mealId: originalMeal.id, userId: user.id })

    expect(mealsRepository.items).toHaveLength(0)
    expect(mealsRepository.items).not.toContain(originalMeal)
  })

  it('should not be able to delete a meal that not exists', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'non-existing-meal-id',
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a meal that not belongs to the user', async () => {
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
