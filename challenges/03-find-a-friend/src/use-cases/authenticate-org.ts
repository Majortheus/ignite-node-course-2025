import { OrganizationsRepository } from '@/repositories/ongs-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, org.password)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization: org,
    }
  }
}
