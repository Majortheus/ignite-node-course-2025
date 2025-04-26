import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateMealBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    eaten_at: z.coerce.date().default(new Date()),
    wasInDiet: z.boolean(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)

  const { name, description, eaten_at, wasInDiet } = updateMealBodySchema.parse(
    request.body,
  )

  const updateMealUseCase = makeUpdateMealUseCase()

  await updateMealUseCase.execute({
    id,
    name,
    description,
    eaten_at,
    wasInDiet,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
