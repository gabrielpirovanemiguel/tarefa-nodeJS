import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ProjectHasAssociatedTasksError } from '@/use_cases/errors/project-has-tasks-error.js'
import { ProjectNotFound } from '@/use_cases/errors/project-not-found.js'
import { makeDeleteProjectUseCase } from '@/use_cases/factories/projects/make-delete-project.js'

export async function deleteProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdProject } = z
      .object({ publicIdProject: z.string() })
      .parse(request.params)
    const deleteProject = makeDeleteProjectUseCase()
    await deleteProject.execute({ publicIdProject })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ProjectNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof ProjectHasAssociatedTasksError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
