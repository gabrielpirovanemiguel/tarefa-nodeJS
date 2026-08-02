import { TaskPresenter } from '@/http/presenters/tasks_presenters.js'
import { TaskNotFound } from '@/use_cases/errors/task_not_found.js'
import { UsersNotFound } from '@/use_cases/errors/users_not_found.js'
import { makeRegisterTaskUserUseCase } from '@/use_cases/factories/task_user/make_register_task_user.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerTaskUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const { publicIdTask } = z
            .object({ publicIdTask: z.string() })
            .parse(request.params)
        const { userIds } = z
            .object({
                userIds: z
                    .array(
                        z.uuid({
                            error: 'Um dos ids de usuário informados é inválido.',
                        }),
                    )
                    .min(1, { error: 'Informe pelo menos um usuário.' }),
            })
            .parse(request.body)
        const registerTaskUser = makeRegisterTaskUserUseCase()

        const { task } = await registerTaskUser.execute({
            publicIdTask,
            userIds,
        })
        return reply.code(201).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof TaskNotFound) {
            return reply.code(404).send({ message: error.message })
        } else if (error instanceof UsersNotFound) {
            return reply.code(404).send({ message: error.message })
        }
        throw error
    }
}
