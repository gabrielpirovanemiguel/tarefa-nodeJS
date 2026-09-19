import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { ListProjectsUseCase } from '@/use-cases/projects/list-projects.js'

export function makeListProjectsUseCase() {
  const ProjectsRepository = new PrismaProjectsRepository()
  const listProjectsUseCase = new ListProjectsUseCase(ProjectsRepository)
  return listProjectsUseCase
}
