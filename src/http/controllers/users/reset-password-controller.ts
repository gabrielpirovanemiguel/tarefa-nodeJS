import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { InvalidTokenError } from '@/use_cases/errors/invalid-token-error.js'
import { makeResetPasswordUseCase } from '@/use_cases/factories/users/make-reset-password.js'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { password } = z
      .object({ password: z.string().trim().min(6).max(100) })
      .parse(request.body)
    const { token } = z.object({ token: z.string() }).parse(request.params)
    const resetPasswordUseCase = makeResetPasswordUseCase()
    const { user } = await resetPasswordUseCase.execute({ token, password })
    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
