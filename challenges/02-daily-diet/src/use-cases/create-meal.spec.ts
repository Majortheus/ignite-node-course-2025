import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMealUseCase } from './create-meal'
import { UserDoesntExistsError } from './errors/user-doesnt-exists-error'

let mealsRepository: InMemoryMealsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateMealUseCase(mealsRepository, usersRepository)
  })

  it('should create a meal', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { meal } = await sut.execute({
      name: 'Salada de alface',
      description: 'Salada de alface',
      eaten_at: new Date(),
      wasInDiet: true,
      user_id: user.id,
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should not be able to create a meal with not existing user', async () => {
    await expect(() =>
      sut.execute({
        name: 'Salada de alface',
        description: 'Salada de alface',
        eaten_at: new Date(),
        wasInDiet: true,
        user_id: 'not-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(UserDoesntExistsError)
  })
})
