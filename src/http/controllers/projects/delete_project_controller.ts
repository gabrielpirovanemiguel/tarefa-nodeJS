import { ProjectHasAssociatedTasksError } from '@/use_cases/errors/project_has_tasks_error.js'
import { ProjectNotFound } from '@/use_cases/errors/project_not_found.js'
import { makeDeleteProjectUseCase } from '@/use_cases/factories/projects/make_delete_project.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function deleteProject(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { publicIdProject } = z.object({ publicIdProject: z.string() }).parse(request.params)

        if (!z.uuid().safeParse(publicIdProject).success) {
            throw new ProjectNotFound()
        }
        const deleteProjectCase = makeDeleteProjectUseCase()
        await deleteProjectCase.execute({ publicIdProject })

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
