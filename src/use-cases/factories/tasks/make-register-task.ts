import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { RegisterTaskUseCase } from '@/use-cases/tasks/register-task.js'

export function makeRegisterTaskUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const tasksRepository = new PrismaTasksRepository()
  const registerProjectUseCase = new RegisterTaskUseCase(
    tasksRepository,
    projectsRepository,
  )
  return registerProjectUseCase
}
