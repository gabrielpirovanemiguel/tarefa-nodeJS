import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { DeleteProjectUseCase } from '@/use_cases/projects/delete-project.js'

export function makeDeleteProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const tasksRepository = new PrismaTasksRepository()
  const deleteProjectUseCase = new DeleteProjectUseCase(
    projectsRepository,
    tasksRepository,
  )

  return deleteProjectUseCase
}
