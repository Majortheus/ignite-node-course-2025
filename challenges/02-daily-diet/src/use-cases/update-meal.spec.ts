import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UpdateMealUseCase } from './update-meal'

let mealsRepository: InMemoryMealsRepository
let usersRepository: InMemoryUsersRepository
let sut: UpdateMealUseCase

describe('Edit Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateMealUseCase(mealsRepository)

    vi.useFakeTimers()
  })

  afterEach(async () => {
    vi.useRealTimers()
  })

  it('should edit a existing meal', async () => {
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

    vi.setSystemTime(new Date(2025, 3, 25, 12, 0, 0))

    const { meal: updatedMeal } = await sut.execute({
      id: originalMeal.id,
      name: 'Salada de alface super calorica',
      description: 'Salada de alface com varias coisas caloricas',
      eaten_at: new Date(2025, 3, 23, 15, 0, 0),
      wasInDiet: false,
      userId: user.id,
    })

    expect(updatedMeal.name).toEqual('Salada de alface super calorica')
    expect(updatedMeal.description).toEqual(
      'Salada de alface com varias coisas caloricas',
    )
    expect(updatedMeal.eaten_at).toEqual(new Date(2025, 3, 23, 15, 0, 0))
    expect(updatedMeal.wasInDiet).toEqual(false)
    expect(updatedMeal.updated_at).toEqual(new Date(2025, 3, 25, 12, 0, 0))
  })

  it('should not be able to update a meal that not exists', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-meal-id',
        name: 'Salada de alface',
        description: 'Salada de alface',
        eaten_at: new Date(),
        wasInDiet: true,
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update a meal that not belongs to the user', async () => {
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
        id: meal.id,
        name: 'Salada de alface',
        description: 'Salada de alface',
        eaten_at: new Date(),
        wasInDiet: true,
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
