import { OrganizationsRepository } from '@/repositories/ongs-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  responsible_name: string
  email: string
  password: string
  whatsapp: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  complement?: string
  number: string
  street: string
}

interface RegisterOrgUseCaseResponse {
  organization: Organization
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrganizationsRepository) {}

  async execute({
    name,
    responsible_name,
    email,
    password,
    whatsapp,
    zipCode,
    state,
    city,
    neighborhood,
    complement,
    number,
    street,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      responsible_name,
      email,
      password: password_hash,
      whatsapp,
      zipCode,
      state,
      city,
      neighborhood,
      complement,
      number,
      street,
    })

    return {
      organization: org,
    }
  }
}
