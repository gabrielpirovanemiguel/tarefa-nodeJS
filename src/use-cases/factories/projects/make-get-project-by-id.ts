import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { GetProjectByIdUseCase } from '@/use-cases/projects/get-project-by-id.js'

export function makeGetProjectByIdUseCase() {
  const projectRepository = new PrismaProjectsRepository()
  const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository)
  return getProjectByIdUseCase
}
