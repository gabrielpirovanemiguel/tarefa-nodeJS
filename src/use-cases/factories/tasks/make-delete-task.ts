import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { DeleteTaskUseCase } from '@/use-cases/tasks/delete-task.js'

export function makeDeleteTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository)
  return deleteTaskUseCase
}
