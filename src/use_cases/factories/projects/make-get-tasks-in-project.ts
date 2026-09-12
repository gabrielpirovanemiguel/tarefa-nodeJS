import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { GetTasksInProjectUseCase } from '@/use_cases/projects/get-tasks-in-project.js'

export function makeGetTasksInProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const getTasksInProjectUseCase = new GetTasksInProjectUseCase(
    projectsRepository,
  )
  return getTasksInProjectUseCase
}
