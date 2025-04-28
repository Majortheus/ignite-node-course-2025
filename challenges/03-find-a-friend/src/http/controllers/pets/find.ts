import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findMealParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const getPetbyIdUseCase = makeGetPetByIdUseCase()

  const { id } = findMealParamsSchema.parse(request.params)
  try {
    const { pet } = await getPetbyIdUseCase.execute({
      petId: id,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource not found.' })
    }
    throw err
  }
}
