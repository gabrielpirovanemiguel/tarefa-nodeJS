import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ProjectPresenter } from '@/http/presenters/projects-presenters.js'
import { statusSchemaThrowError } from '@/use-cases/errors/invalid-status.js'
import { ProjectNotFound } from '@/use-cases/errors/project-not-found.js'
import { makeUpdateProjectUseCase } from '@/use-cases/factories/projects/make-update-project.js'

const updateProjectBodyScheme = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().min(1).max(100).optional(),
  status: statusSchemaThrowError.optional(),
})

export async function updateProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdProject } = z
      .object({ publicIdProject: z.string() })
      .parse(request.params)
    const { name, description, status } = updateProjectBodyScheme.parse(
      request.body,
    )
    const updateProject = makeUpdateProjectUseCase()
    const { project } = await updateProject.execute({
      publicIdProject,
      name,
      description,
      status,
    })

    return reply.status(200).send(ProjectPresenter.toHTTP(project))
  } catch (error) {
    if (error instanceof ProjectNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
