import { PrismaProjectsRepository } from '@/repositories/prisma/projects_prisma_repository.js'
import { UpdateProjectUseCase } from '@/use_cases/projects/update_project.js'

export function makeUpdateProjectUseCase() {
    const projectsRepository = new PrismaProjectsRepository()
    const updateUseCase = new UpdateProjectUseCase(projectsRepository)

    return updateUseCase
}
