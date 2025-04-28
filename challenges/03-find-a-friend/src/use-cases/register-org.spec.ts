import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should to register organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      whatsapp: '+5511999999999',
      zipCode: '12345678',
      state: 'SP',
      city: 'Guarulhos',
      neighborhood: 'Centro',
      number: '123',
      street: 'Rua Exemplo',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      whatsapp: '+5511999999999',
      zipCode: '12345678',
      state: 'SP',
      city: 'Guarulhos',
      neighborhood: 'Centro',
      number: '123',
      street: 'Rua Exemplo',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email,
      password: '123456',
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
        name: 'John Doe ONG',
        responsible_name: 'John Doe',
        email,
        password: '123456',
        whatsapp: '+5511999999999',
        zipCode: '12345678',
        state: 'SP',
        city: 'Guarulhos',
        neighborhood: 'Centro',
        number: '123',
        street: 'Rua Exemplo',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
