import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ProjectPresenter } from '@/http/presenters/projects-presenters.js'
import { ProjectNotFound } from '@/use-cases/errors/project-not-found.js'
import { makeGetProjectByIdUseCase } from '@/use-cases/factories/projects/make-get-project-by-id.js'

export async function getProjectById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { publicIdProject } = z
      .object({ publicIdProject: z.string() })
      .parse(request.params)
    const getById = makeGetProjectByIdUseCase()
    const { project } = await getById.execute({ publicIdProject })

    return reply.status(200).send(ProjectPresenter.toHTTP(project))
  } catch (error) {
    if (error instanceof ProjectNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
