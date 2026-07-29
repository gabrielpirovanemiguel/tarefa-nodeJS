import { PrismaProjectsRepository } from "@/repositories/prisma/projects_prisma_repository.js"
import { DeleteProjectUseCase } from "@/use_cases/projects/delete_project.js"

export function makeDeleteProjectUseCase() {
    const projectsRepository = new PrismaProjectsRepository()
    const deleteProjectUseCase = new DeleteProjectUseCase(projectsRepository)

    return deleteProjectUseCase
}
