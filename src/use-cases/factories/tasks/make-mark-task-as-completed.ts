import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'

import { MarkTaskAsCompletedUseCase } from '@/use-cases/tasks/mark-task-as-completed.js'

export function makeMarkTaskAsCompletedUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const markTaskAsCompletedUseCase = new MarkTaskAsCompletedUseCase(
    tasksRepository,
  )
  return markTaskAsCompletedUseCase
}
