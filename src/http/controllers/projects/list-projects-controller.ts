import type { FastifyReply, FastifyRequest } from 'fastify'
import { ProjectPresenter } from '@/http/presenters/projects-presenters.js'
import { makeListProjectsUseCase } from '@/use_cases/factories/projects/make-list-projects.js'

export async function listProjects(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const listProjects = makeListProjectsUseCase()
  const { projects } = await listProjects.execute()

  return reply.status(200).send(ProjectPresenter.toHTTP(projects))
}
