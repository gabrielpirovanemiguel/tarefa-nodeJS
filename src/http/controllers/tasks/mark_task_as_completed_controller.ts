import { TaskPresenter } from "@/http/presenters/tasks_presenters.js";
import { InvalidPermissions } from "@/use_cases/errors/invalid_permissions_error.js";
import { TaskNotFound } from "@/use_cases/errors/task_not_found.js";
import { makeMarkTaskAsCompletedUseCase } from "@/use_cases/factories/tasks/make_mark_task_as_completed.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function markTaskAsCompleted(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const markTaskAsCompletedParamSchema = z.object({publicId: z.uuid()})
        const { publicId } = markTaskAsCompletedParamSchema.parse(request.params)
        const { sub: publicIdLoggedUser } = request.user as {sub: string}
        const markTaskAsCompletedUseCase = makeMarkTaskAsCompletedUseCase()
        const { task } = await markTaskAsCompletedUseCase.execute({publicId, publicIdLoggedUser})

        return reply.code(200).send({task: TaskPresenter.toHTTP(task)})
    } catch (error) {
        if (error instanceof TaskNotFound) {
            return reply.code(404).send({message: error.message})
        } else if( error instanceof InvalidPermissions) {
            return reply.code(403).send({messaage: error.message})
        }
        throw error
    }


}