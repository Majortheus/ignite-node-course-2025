import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { create } from './create'
import { find } from './find'
import { metrics } from './metrics'
import { remove } from './remove'
import { search } from './search'
import { update } from './update'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get(`/meals`, search)
  app.post(`/meals`, create)
  app.get(`/meals/:id`, find)
  app.put(`/meals/:id`, update)
  app.delete(`/meals/:id`, remove)

  app.get(`/meals/metrics`, metrics)
}
