import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { find } from './find'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
  app.post('/pets', { onRequest: [verifyJwt] }, create)
  app.get('/pets/:id', find)
}
