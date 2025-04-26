import { makeGetMealByIdUseCase } from '@/use-cases/factories/make-get-meal-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const getMealByUserIdUseCase = makeGetMealByIdUseCase()

  const { id } = findMealParamsSchema.parse(request.params)

  const { meal } = await getMealByUserIdUseCase.execute({
    userId: request.user.sub,
    mealId: id,
  })

  return reply.status(200).send({
    meal,
  })
}
