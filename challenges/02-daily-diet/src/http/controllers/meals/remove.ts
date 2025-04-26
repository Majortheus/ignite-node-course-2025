import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)

  const deleteMealUseCase = makeDeleteMealUseCase()

  await deleteMealUseCase.execute({
    mealId: id,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
