import { PetsRepository } from '@/repositories/pets-repository'

type SearchPetsRequest = {
  city: string
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'OLD'
  energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'SMALL' | 'MEDIUM' | 'LARGE'
  independent?: 'LOW' | 'MEDIUM' | 'HIGH'
  type?: 'DOG' | 'CAT'
  size?: 'TINY' | 'SMALL' | 'MEDIUM' | 'LARGE'
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy,
    environment,
    independent,
    type,
    size,
  }: SearchPetsRequest) {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      energy,
      environment,
      independent,
      type,
      size,
    })

    return { pets }
  }
}
