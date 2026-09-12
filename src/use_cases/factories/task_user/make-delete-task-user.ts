import { PrismaTaskUserRepository } from '@/repositories/prisma/task-user-prisma-repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteTaskUserUseCase } from '@/use_cases/task_user/delete-task-user.js'

export function makeDeleteTaskUserUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const taskUserRepository = new PrismaTaskUserRepository()
  const userRepository = new PrismaUsersRepository()
  const deleteTaskUserUseCase = new DeleteTaskUserUseCase(
    taskUserRepository,
    tasksRepository,
    userRepository,
  )
  return deleteTaskUserUseCase
}
