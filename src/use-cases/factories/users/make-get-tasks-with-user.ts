import { PrismaTaskUserRepository } from '@/repositories/prisma/task-user-prisma-repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetTasksWithUserUseCase } from '@/use-cases/users/get-tasks-with-user.js'

export function makeGetTasksWithUserUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const taskUserRepository = new PrismaTaskUserRepository()
  const userRepository = new PrismaUsersRepository()
  const getTasksWithUserUseCase = new GetTasksWithUserUseCase(
    taskUserRepository,
    tasksRepository,
    userRepository,
  )
  return getTasksWithUserUseCase
}
