import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { UpdateTaskUseCase } from '@/use-cases/tasks/update-task.js'

export function makeUpdateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const projectsRepository = new PrismaProjectsRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(
    tasksRepository,
    projectsRepository,
  )
  return updateTaskUseCase
}
