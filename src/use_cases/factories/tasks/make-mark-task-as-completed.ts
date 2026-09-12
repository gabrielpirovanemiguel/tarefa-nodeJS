import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { MarkTaskAsCompletedUseCase } from '@/use_cases/tasks/mark-task-as-completed.js'

export function makeMarkTaskAsCompletedUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const usersRespository = new PrismaUsersRepository()
  const markTaskAsCompletedUseCase = new MarkTaskAsCompletedUseCase(
    tasksRepository,
    usersRespository,
  )
  return markTaskAsCompletedUseCase
}
