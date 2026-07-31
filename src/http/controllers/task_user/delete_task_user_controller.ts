import { TaskNotFound } from "@/use_cases/errors/task_not_found.js"
import { TaskUserNotFound } from "@/use_cases/errors/task_user_not_found_error.js"
import { UserNotFound } from "@/use_cases/errors/user_not_found.js"
import { makeDeleteTaskUserUseCase } from "@/use_cases/factories/task_user/make_delete_task_user.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"


export async function deleteTaskUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { taskId, userId } = z.object({
            taskId: z.string(),
            userId: z.string(),
        }).parse(request.params)
        const deleteTaskUserUseCase = makeDeleteTaskUserUseCase()
        await deleteTaskUserUseCase.execute({ taskId, userId })
        return reply.status(204).send()
    } catch (error) {
        if (error instanceof TaskNotFound || error instanceof UserNotFound || error instanceof TaskUserNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}