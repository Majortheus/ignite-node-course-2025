import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    city: z.string(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'OLD']).optional(),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    independent: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    type: z.enum(['DOG', 'CAT']).optional(),
    size: z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const { city, age, energy, environment, independent, type, size } =
    registerBodySchema.parse(request.query)

  const searchPetUseCase = makeSearchPetUseCase()

  const { pets } = await searchPetUseCase.execute({
    city,
    age,
    energy,
    environment,
    independent,
    type,
    size,
  })

  return reply.status(200).send({
    pets,
  })
}
