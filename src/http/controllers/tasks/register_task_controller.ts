import { PRIORITY } from '@/@types/prisma/enums.js'
import { TaskPresenter } from '@/http/presenters/tasks_presenters.js'
import { ProjectNotFound } from '@/use_cases/errors/project_not_found.js'
import { makeRegisterTaskUseCase } from '@/use_cases/factories/tasks/make_register_task.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

const registerTaskBodySchema = z.object({
    title: z.string().trim().min(1, { error: 'A tarefa deve ter um título.' }).max(100),
    description: z.string().trim().max(300).optional(),
    priority: z.enum(PRIORITY, { error: 'A prioridade escolhida para a tarefa é inválida.' }),
    completed: z.boolean().default(false),
    deadline: z.date().optional(),
    projectId: z.uuid({ error: 'O projeto escolhido para a tarefa é inválido.' }),

})

export async function registerTask(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const { title, description, priority, completed, deadline, projectId } = registerTaskBodySchema.parse(
            request.body,
        )
        const registerTaskUseCase = makeRegisterTaskUseCase()
        const { task } = await registerTaskUseCase.execute({
            title,
            description,
            priority,
            completed,
            deadline,
            project: projectId
        })
        reply.status(201).send(TaskPresenter.toHTTP(task))
    } catch (error) {
        if (error instanceof ProjectNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
