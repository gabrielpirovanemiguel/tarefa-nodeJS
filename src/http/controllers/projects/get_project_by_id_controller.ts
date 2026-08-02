import { ProjectPresenter } from '@/http/presenters/projects_presenters.js'
import { ProjectNotFound } from '@/use_cases/errors/project_not_found.js'
import { makeGetProjectByIdUseCase } from '@/use_cases/factories/projects/make_get_project_by_id.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getProjectById(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const { publicIdProject } = z.object({ publicIdProject: z.string() }).parse(request.params)
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
