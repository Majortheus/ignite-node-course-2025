import { OrganizationsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgDoesntExistsError } from './errors/org-doesnt-exists-error'

type CreatePetRequest = {
  organization_id: string
  name: string
  about: string
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'OLD'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  independent: 'LOW' | 'MEDIUM' | 'HIGH'
  type: 'DOG' | 'CAT'
  size: 'TINY' | 'SMALL' | 'MEDIUM' | 'LARGE'
  photos_url: string[]
  requirements: string[]
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    organization_id,
    name,
    about,
    age,
    energy,
    environment,
    independent,
    type,
    size,
    photos_url,
    requirements,
  }: CreatePetRequest) {
    const organization = await this.orgsRepository.findById(organization_id)

    if (!organization) {
      throw new OrgDoesntExistsError()
    }

    const pet = await this.petsRepository.create({
      organization_id,
      name,
      about,
      age,
      energy,
      environment,
      independent,
      type,
      size,
      photos_url,
      requirements,
    })

    return { pet }
  }
}
