import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthUserUseCase } from '@/use-cases/factories/users/make-auth-user.js'

const authenticateSchema = z.object({
  email: z.email().trim().min(1),
  password: z.string().min(1),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateSchema.parse(request.body)

    const authUserUseCase = makeAuthUserUseCase({
      sign: (payload) => reply.jwtSign(payload, { expiresIn: '1d' }),
    })
    const { user, token } = await authUserUseCase.execute({ email, password })

    return reply.status(200).send({ token, user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
