import { TaskPresenter } from "@/http/presenters/tasks_presenters.js"
import { TaskNotFound } from "@/use_cases/errors/task_not_found.js"
import { makeGetTaskByIdUseCase } from "@/use_cases/factories/tasks/make_get_task_by_id.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"


export async function getTaskById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const publicIdParamSchema = z.object({
            publicId: z.uuid()
        })
        const { publicId } = publicIdParamSchema.parse(request.params)

        const getTaskUseCase = makeGetTaskByIdUseCase()

        const { task } = await getTaskUseCase.execute({ publicId })
        return reply.status(200).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof TaskNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}