import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { USER_ROLE } from '@/@types/prisma/client.js'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { EmailAlreadyInUse } from '@/use-cases/errors/email-already-in-use-error.js'
import { makeRegisterUserUseCase } from '@/use-cases/factories/users/make-register-user.js'

const registerBodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().trim().min(1).max(100),
  password: z.string().trim().min(6).max(100),
  role: z.enum(USER_ROLE).optional().default('user'),
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, password, role } = registerBodySchema.parse(
      request.body,
    )
    const registerUseCase = makeRegisterUserUseCase()
    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
      role,
    })
    return reply.status(201).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof EmailAlreadyInUse) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
