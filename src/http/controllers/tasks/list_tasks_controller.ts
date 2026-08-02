import { PRIORITY, TASK_FIELDS } from "@/@types/prisma/enums.js";
import { TaskPresenter } from "@/http/presenters/tasks_presenters.js";
import { makeListTasksUseCase } from "@/use_cases/factories/tasks/make_list_tasks.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const listTaskQuerySchema = z.object({
    completed: z
        .enum(["true", "false"], {error: "Valor de filtro para completed inválido"})
        .transform((val) => val === "true")
        .optional(),
    priority: z.enum(PRIORITY, { error: "Valor de filtro para prioridade inválido" }).optional(),
    sort: z.enum(TASK_FIELDS, { error: "Valor de filtro para ordenação inválido" }).optional(),
    order: z.enum(["asc", "desc"], { error: "Valor de filtro para ordenação inválido" }).optional()
})

export async function listTasks(request: FastifyRequest, reply: FastifyReply) {
    try {
        const query = listTaskQuerySchema.parse(request.query)
        const listTasks = makeListTasksUseCase()
        const { tasks } = await listTasks.execute({ query })
        return reply.status(200).send(TaskPresenter.toHTTP(tasks))
    } catch (error) {
        throw error
    }
}