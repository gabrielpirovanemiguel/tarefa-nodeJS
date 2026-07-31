import { TaskPresenter } from "@/http/presenters/tasks_presenters.js";
import { TaskNotFound } from "@/use_cases/errors/task_not_found.js";
import { UsersNotFound } from "@/use_cases/errors/users_not_found.js";
import { makeRegisterTaskUserUseCase } from "@/use_cases/factories/task_user/make_register_task_use.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function registerTaskUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { publicId: publicIdTask } = z.object({ publicId: z.string() }).parse(request.params)
        if (!z.uuid().safeParse(publicIdTask).success) {
            throw new TaskNotFound()
        }
        const { userIds } = z.object({
            userIds: z.array(z.uuid({ error: 'Um dos ids de usuário informados é inválido.' })).min(1, { error: 'Informe pelo menos um usuário.' })
        }).parse(request.body)
        const registerTaskUserUseCase = makeRegisterTaskUserUseCase()
        
        const { task } = await registerTaskUserUseCase.execute({ publicIdTask, userIds })
        return reply.code(201).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof TaskNotFound) {
            reply.code(404).send({ message: error.message })
        } else if (error instanceof UsersNotFound) {
            reply.code(404).send({ message: error.message })
        }
        throw error
    }
}