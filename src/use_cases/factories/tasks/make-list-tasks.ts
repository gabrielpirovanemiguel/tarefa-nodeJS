import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { CachedTasksRepository } from '@/repositories/redis/cached-tasks-repository.js'
import { ListTasksUseCase } from '@/use_cases/tasks/list-tasks.js'

export function makeListTasksUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const cachedTasksRepository = new CachedTasksRepository(tasksRepository)
  const listTasksUseCase = new ListTasksUseCase(cachedTasksRepository)
  return listTasksUseCase
}
