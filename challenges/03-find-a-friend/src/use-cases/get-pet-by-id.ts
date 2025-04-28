import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetPetByIdRequest = {
  petId: string
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetByIdRequest) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
