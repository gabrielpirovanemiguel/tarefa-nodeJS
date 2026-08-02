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
        const { publicIdTask } = z.object({ publicIdTask: z.string() }).parse(request.params)
        const payLoadUser = request.user
        const markTaskAsCompleted = makeMarkTaskAsCompletedUseCase()
        const { task } = await markTaskAsCompleted.execute({ publicIdTask, payLoadUser })

        return reply.code(200).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof TaskNotFound) {
            return reply.code(404).send({message: error.message})
        } else if( error instanceof InvalidPermissions) {
            return reply.code(403).send({message: error.message})
        }
        throw error
    }


}