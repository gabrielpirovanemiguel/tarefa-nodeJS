import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { statusSchemaThrowError } from '@/use_cases/errors/invalid_status.js'
import { ProjectNotFound } from '@/use_cases/errors/project_not_found.js'
import { ProjectPresenter } from '@/http/presenters/projects_presenters.js'
import { makeUpdateProjectUseCase } from '@/use_cases/factories/projects/make_update_project.js'

const updateProjectBodyScheme = z.object({
    name: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().min(1).max(100).optional(),
    status: statusSchemaThrowError.optional(),
})

export async function updateProject(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { publicIdProject } = z.object({ publicIdProject: z.string() }).parse(request.params)

        if (!z.uuid().safeParse(publicIdProject).success) {
            throw new ProjectNotFound()
        }
        const { name, description, status } = updateProjectBodyScheme.parse(request.body)
        const updateProject = makeUpdateProjectUseCase()
        const { project } = await updateProject.execute({
            publicIdProject,
            name,
            description,
            status
        })

        return reply.status(200).send(ProjectPresenter.toHTTP(project))
    } catch (error) {
        if (error instanceof ProjectNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
