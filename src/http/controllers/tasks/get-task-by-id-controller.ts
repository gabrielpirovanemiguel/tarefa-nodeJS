import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { TaskPresenter } from '@/http/presenters/tasks-presenters.js'
import { TaskNotFound } from '@/use-cases/errors/task-not-found.js'
import { makeGetTaskByIdUseCase } from '@/use-cases/factories/tasks/make-get-task-by-id.js'

export async function getTaskById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdTask } = z
      .object({ publicIdTask: z.string() })
      .parse(request.params)
    const getTask = makeGetTaskByIdUseCase()
    const { task } = await getTask.execute({ publicIdTask })
    return reply.status(200).send(TaskPresenter.toHTTP(task))
  } catch (error) {
    if (error instanceof TaskNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
