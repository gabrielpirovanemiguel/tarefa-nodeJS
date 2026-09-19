import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { UpdateProjectUseCase } from '@/use-cases/projects/update-project.js'

export function makeUpdateProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const updateUseCase = new UpdateProjectUseCase(projectsRepository)

  return updateUseCase
}
