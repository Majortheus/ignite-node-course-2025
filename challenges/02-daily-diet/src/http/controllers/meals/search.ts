import { makeGetMealsByUserIdUseCase } from '@/use-cases/factories/make-get-meals-by-user-id'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const getMealsByUserIdUseCase = makeGetMealsByUserIdUseCase()

  const { meals } = await getMealsByUserIdUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    meals,
  })
}
