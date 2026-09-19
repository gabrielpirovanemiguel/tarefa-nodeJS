import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { RegisterProjectUseCase } from '@/use-cases/projects/register-project.js'

export function makeRegisterProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const registerProjectUseCase = new RegisterProjectUseCase(projectsRepository)
  return registerProjectUseCase
}
