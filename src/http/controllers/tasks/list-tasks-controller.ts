import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PRIORITY, TASK_FIELDS } from '@/@types/prisma/enums.js'
import { TaskPresenter } from '@/http/presenters/tasks-presenters.js'
import { makeListTasksUseCase } from '@/use-cases/factories/tasks/make-list-tasks.js'

const listTaskQuerySchema = z.object({
  completed: z
    .enum(['true', 'false'], {
      error: 'Valor de filtro para completed inválido',
    })
    .transform((val) => val === 'true')
    .optional(),
  priority: z
    .enum(PRIORITY, { error: 'Valor de filtro para prioridade inválido' })
    .optional(),
  sort: z
    .enum(TASK_FIELDS, { error: 'Valor de filtro para ordenação inválido' })
    .optional(),
  order: z
    .enum(['asc', 'desc'], {
      error: 'Valor de filtro para ordenação inválido',
    })
    .optional(),
})

export async function listTasks(request: FastifyRequest, reply: FastifyReply) {
  const query = listTaskQuerySchema.parse(request.query)
  const listTasks = makeListTasksUseCase()
  const { tasks } = await listTasks.execute({ query })
  return reply.status(200).send(TaskPresenter.toHTTP(tasks))
}
