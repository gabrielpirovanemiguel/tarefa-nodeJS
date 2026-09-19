import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { TaskNotFound } from '@/use-cases/errors/task-not-found.js'
import { TaskUserNotFound } from '@/use-cases/errors/task-user-not-found-error.js'
import { UserNotFound } from '@/use-cases/errors/user-not-found.js'
import { makeDeleteTaskUserUseCase } from '@/use-cases/factories/task_user/make-delete-task-user.js'

export async function deleteTaskUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { taskId, userId } = z
      .object({
        taskId: z.string(),
        userId: z.string(),
      })
      .parse(request.params)
    const deleteTaskUser = makeDeleteTaskUserUseCase()
    await deleteTaskUser.execute({ taskId, userId })
    return reply.status(204).send()
  } catch (error) {
    if (
      error instanceof TaskNotFound ||
      error instanceof UserNotFound ||
      error instanceof TaskUserNotFound
    ) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
