import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { UserNotFound } from '@/use-cases/errors/user-not-found.js'
import { makeGetUserByIdUseCase } from '@/use-cases/factories/users/make-get-by-id.js'

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdUser } = z
      .object({ publicIdUser: z.string() })
      .parse(request.params)
    const getByIdUseCase = makeGetUserByIdUseCase()
    const { user } = await getByIdUseCase.execute({ publicIdUser })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof UserNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
