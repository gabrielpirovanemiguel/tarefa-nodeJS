import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { TaskPresenter } from '@/http/presenters/tasks-presenters.js'
import { UserNotFound } from '@/use-cases/errors/user-not-found.js'
import { makeGetTasksWithUserUseCase } from '@/use-cases/factories/users/make-get-tasks-with-user.js'

export async function getTasksWithUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdUser } = z
      .object({ publicIdUser: z.string() })
      .parse(request.params)
    const getTasksWithUserUseCase = makeGetTasksWithUserUseCase()
    const { tasks } = await getTasksWithUserUseCase.execute({
      publicIdUser,
    })
    return reply.status(200).send(TaskPresenter.toHTTP(tasks))
  } catch (error) {
    if (error instanceof UserNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
