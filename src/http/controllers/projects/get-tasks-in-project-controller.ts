import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { TaskPresenter } from '@/http/presenters/tasks-presenters.js'
import { ProjectNotFound } from '@/use_cases/errors/project-not-found.js'
import { makeGetTasksInProjectUseCase } from '@/use_cases/factories/projects/make-get-tasks-in-project.js'

export async function getTasksInProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdProject } = z
      .object({ publicIdProject: z.string() })
      .parse(request.params)
    const getTasksInProject = makeGetTasksInProjectUseCase()
    const { tasks } = await getTasksInProject.execute({ publicIdProject })

    return reply.status(200).send(TaskPresenter.toHTTP(tasks))
  } catch (error) {
    if (error instanceof ProjectNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
