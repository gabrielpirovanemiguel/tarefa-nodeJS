import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { TaskNotFound } from '@/use_cases/errors/task-not-found.js'
import { makeDeleteTaskUseCase } from '@/use_cases/factories/tasks/make-delete-task.js'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { publicIdTask } = z
      .object({ publicIdTask: z.string() })
      .parse(request.params)
    const deleteTask = makeDeleteTaskUseCase()
    await deleteTask.execute({ publicIdTask })

    return reply.code(204).send()
  } catch (error) {
    if (error instanceof TaskNotFound) {
      reply.code(404).send({ message: error.message })
    }
    throw error
  }
}
