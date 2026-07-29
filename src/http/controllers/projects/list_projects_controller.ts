import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListProjectsUseCase } from '@/use_cases/factories/projects/make_list_projects.js'
import { ProjectPresenter } from '@/http/presenters/projects_presenters.js'

export async function listProjects(request: FastifyRequest, reply: FastifyReply) {
    try {
        const listProjects = makeListProjectsUseCase()
        const { projects } = await listProjects.execute()

        return reply.status(200).send({ projects: ProjectPresenter.toHTTP(projects) })
    } catch (error) {
        throw error
    }
}
