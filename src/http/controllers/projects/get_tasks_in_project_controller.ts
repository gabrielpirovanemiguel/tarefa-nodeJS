import { TaskPresenter } from '@/http/presenters/tasks_presenters.js'
import { ProjectNotFound } from '@/use_cases/errors/project_not_found.js'
import { makeGetTasksInProjectUseCase } from '@/use_cases/factories/projects/make_get_tasks_in_project.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getTasksInProject(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const { publicId } = z.object({ publicId: z.string() }).parse(request.params)
        const getTasksInProjectUseCase = makeGetTasksInProjectUseCase()
        const { tasks } = await getTasksInProjectUseCase.execute({ publicId })

        return reply.status(200).send(TaskPresenter.toHTTP(tasks!))
    } catch (error) {
        if (error instanceof ProjectNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
