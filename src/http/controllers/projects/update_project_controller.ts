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
        const updateProjectParamsSchema = z.object({ publicId: z.uuid() })

        const { name, description, status } = updateProjectBodyScheme.parse(request.body)
        const { publicId } = updateProjectParamsSchema.parse(request.params)

        const updateProjectCase = makeUpdateProjectUseCase()
        const { project } = await updateProjectCase.execute({
            publicId,
            name,
            description,
            status
        })

        return reply.status(200).send(ProjectPresenter.toHTTP(project))
    } catch (error) {
        if (error instanceof ProjectNotFound) {
            return reply.status(404).send({ message: error.message })
        } else if (error instanceof z.ZodError) {
            return reply.status(400).send(z.treeifyError(error))
        }
        throw error
    }
}
