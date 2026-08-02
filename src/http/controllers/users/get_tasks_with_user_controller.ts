import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserNotFound } from '@/use_cases/errors/user_not_found.js'
import { makeGetTasksWithUserUseCase } from '@/use_cases/factories/users/make_get_tasks_with_user.js'
import { TaskPresenter } from '@/http/presenters/tasks_presenters.js'

export async function getTasksWithUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const { publicIdUser } = z.object({ publicIdUser: z.string() }).parse(request.params)
        const getTasksWithUserUseCase = makeGetTasksWithUserUseCase()
        const { tasks } = await getTasksWithUserUseCase.execute({ publicIdUser })
        return reply.status(200).send(TaskPresenter.toHTTP(tasks))
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
