import { TaskNotFound } from "@/use_cases/errors/task_not_found.js";
import { makeDeleteTaskUseCase } from "@/use_cases/factories/tasks/make_delete_task.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function deleteTask(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const deleteTaskParamSchema = z.object({publicId: z.uuid()})
        const { publicId } = deleteTaskParamSchema.parse(request.params)

        const deleteTaskUseCase = makeDeleteTaskUseCase()
        await deleteTaskUseCase.execute({publicId})

        return reply.code(204).send()
    } catch (error) {
        if (error instanceof TaskNotFound) {
            reply.code(404).send({message: error.message})
        } 
        throw error
    }
}