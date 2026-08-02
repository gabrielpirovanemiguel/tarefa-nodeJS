import { TaskPresenter } from "@/http/presenters/tasks_presenters.js"
import { TaskNotFound } from "@/use_cases/errors/task_not_found.js"
import { makeGetTaskByIdUseCase } from "@/use_cases/factories/tasks/make_get_task_by_id.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"


export async function getTaskById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { publicIdTask } = z.object({ publicIdTask: z.string() }).parse(request.params)

        if (!z.uuid().safeParse(publicIdTask).success) {
            throw new TaskNotFound()
        }

        const getTask = makeGetTaskByIdUseCase()

        const { task } = await getTask.execute({ publicIdTask })
        return reply.status(200).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof TaskNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}