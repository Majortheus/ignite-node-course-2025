import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    responsible_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    zipCode: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    complement: z.string().optional(),
    number: z.string(),
    street: z.string(),
  })

  const {
    name,
    responsible_name,
    email,
    password,
    whatsapp,
    zipCode,
    state,
    city,
    neighborhood,
    complement,
    number,
    street,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrgUseCase()

    await registerUseCase.execute({
      name,
      responsible_name,
      email,
      password,
      whatsapp,
      zipCode,
      state,
      city,
      neighborhood,
      complement,
      number,
      street,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
