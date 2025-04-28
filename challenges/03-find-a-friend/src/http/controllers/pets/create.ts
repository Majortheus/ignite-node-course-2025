import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'OLD']),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    independent: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    type: z.enum(['DOG', 'CAT']),
    size: z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE']),
    photos_url: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
  })

  const {
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
  } = registerBodySchema.parse(request.body)

  const createPet = makeCreatePetUseCase()

  await createPet.execute({
    organization_id: request.user.sub,
    name,
    about,
    age,
    energy,
    environment,
    independent,
    type,
    size,
    photos_url: photos_url ?? [],
    requirements: requirements ?? [],
  })

  return reply.status(201).send()
}
