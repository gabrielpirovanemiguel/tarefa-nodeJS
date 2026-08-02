import { PRIORITY } from '@/@types/prisma/enums.js'
import { TaskPresenter } from '@/http/presenters/tasks_presenters.js'
import { ProjectNotFound } from '@/use_cases/errors/project_not_found.js'
import { TaskNotFound } from '@/use_cases/errors/task_not_found.js'
import { makeUpdateTaskUseCase } from '@/use_cases/factories/tasks/make_update_task.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

const updateTaskBodySchema = z.object({
    title: z.string().trim().max(100).optional(),
    description: z.string().trim().max(300).optional(),
    priority: z
        .enum(PRIORITY, {
            error: 'O tipo de prioridade selecionada para essa tarefa é inválido.',
        })
        .optional(),
    completed: z.boolean().optional(),
    deadline: z.coerce.date().optional(),
    projectId: z.number().int().positive().optional(),
})

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { publicIdTask } = z
            .object({ publicIdTask: z.string() })
            .parse(request.params)
        const { title, description, priority, completed, deadline, projectId } =
            updateTaskBodySchema.parse(request.body)

        const updateTaskUseCase = makeUpdateTaskUseCase()

        const { task } = await updateTaskUseCase.execute({
            publicIdTask,
            title,
            description,
            priority,
            completed,
            deadline,
            projectId,
        })

        return reply.code(200).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof ProjectNotFound) {
            return reply.code(404).send({ message: error.message })
        } else if (error instanceof TaskNotFound) {
            return reply.code(404).send({ message: error.message })
        }
        throw error
    }
}
