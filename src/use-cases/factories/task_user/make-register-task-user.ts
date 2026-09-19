import { PrismaTaskUserRepository } from '@/repositories/prisma/task-user-prisma-repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterTaskUserUseCase } from '@/use-cases/task_user/register-task-user.js'

export function makeRegisterTaskUserUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const taskUserRepository = new PrismaTaskUserRepository()
  const usersRepository = new PrismaUsersRepository()
  const registerTaskUseCase = new RegisterTaskUserUseCase(
    taskUserRepository,
    tasksRepository,
    usersRepository,
  )
  return registerTaskUseCase
}
