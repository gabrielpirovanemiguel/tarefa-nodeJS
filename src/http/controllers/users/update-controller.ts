import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { UserNotFound } from '@/use-cases/errors/user-not-found.js'
import { makeUpdateUserUseCase } from '@/use-cases/factories/users/make-update-user.js'

const updateUserBodyScheme = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  password: z.string().min(6).max(100).optional(),
})

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { publicIdUser } = z
      .object({ publicIdUser: z.string() })
      .parse(request.params)
    const { name, password } = updateUserBodyScheme.parse(request.body)

    const updateUserCase = makeUpdateUserUseCase()
    const { user } = await updateUserCase.execute({
      publicIdUser,
      name,
      password,
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof UserNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
