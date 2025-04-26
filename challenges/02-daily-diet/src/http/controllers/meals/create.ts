import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    eaten_at: z.coerce.date().default(new Date()),
    wasInDiet: z.boolean(),
  })

  const { name, description, eaten_at, wasInDiet } = createMealBodySchema.parse(
    request.body,
  )

  const createMealUseCase = makeCreateMealUseCase()

  await createMealUseCase.execute({
    name,
    description,
    eaten_at,
    wasInDiet,
    user_id: request.user.sub,
  })

  return reply.status(201).send()
}
