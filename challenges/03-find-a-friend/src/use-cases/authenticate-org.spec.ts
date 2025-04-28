import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      whatsapp: '+5511999999999',
      zipCode: '12345678',
      state: 'SP',
      city: 'Guarulhos',
      neighborhood: 'Centro',
      number: '123',
      street: 'Rua Exemplo',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid user', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      whatsapp: '+5511999999999',
      zipCode: '12345678',
      state: 'SP',
      city: 'Guarulhos',
      neighborhood: 'Centro',
      number: '123',
      street: 'Rua Exemplo',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
