import { makeCountAllMealsByUserIdUseCase } from '@/use-cases/factories/make-count-all-meals-by-user-id-use-case'
import { makeCountAllMealsInDietByUserIdUseCase } from '@/use-cases/factories/make-count-all-meals-in-diet-by-user-id-use-case'
import { makeCountAllMealsNotInDietByUserIdUseCase } from '@/use-cases/factories/make-count-all-meals-not-in-diet-by-user-id'
import { makeCountMealSequenceInDietByUserIdUseCase } from '@/use-cases/factories/make-count-meal-sequence-in-diet-by-user-id'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const countAllMealsByUserIdUseCase = makeCountAllMealsByUserIdUseCase()
  const { allMealsCount } = await countAllMealsByUserIdUseCase.execute({
    userId: request.user.sub,
  })

  const countAllMealsInDietByUserIdUseCase =
    makeCountAllMealsInDietByUserIdUseCase()
  const { allMealsInDietCount } =
    await countAllMealsInDietByUserIdUseCase.execute({
      userId: request.user.sub,
    })

  const countAllMealsNotInDietByUserIdUseCase =
    makeCountAllMealsNotInDietByUserIdUseCase()
  const { allMealsNotInDietCount } =
    await countAllMealsNotInDietByUserIdUseCase.execute({
      userId: request.user.sub,
    })

  const countMealSequenceInDietByUserIdUseCase =
    makeCountMealSequenceInDietByUserIdUseCase()
  const { mealSequenceInDietCount } =
    await countMealSequenceInDietByUserIdUseCase.execute({
      userId: request.user.sub,
    })

  return reply.status(200).send({
    allMealsCount,
    allMealsInDietCount,
    allMealsNotInDietCount,
    mealSequenceInDietCount,
  })
}
