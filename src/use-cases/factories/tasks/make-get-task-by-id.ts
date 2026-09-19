import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { GetTaskByIdUseCase } from '@/use-cases/tasks/get-task-by-id.js'

export function makeGetTaskByIdUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository)
  return getTaskByIdUseCase
}
