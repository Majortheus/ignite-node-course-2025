import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrgs(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'John Doe ONG',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      whatsapp: '+5511999999999',
      zipCode: '12345678',
      state: 'SP',
      city: 'Guarulhos',
      neighborhood: 'Centro',
      number: '123',
      street: 'Rua Exemplo',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
