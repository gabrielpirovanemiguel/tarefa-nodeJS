import { PrismaProjectsRepository } from "@/repositories/prisma/projects_prisma_repository.js"
import { RegisterProjectUseCase } from "@/use_cases/projects/register_project.js"


export function makeRegisterProjectUseCase() {
    const projectsRepository = new PrismaProjectsRepository()
    const registerProjectUseCase = new RegisterProjectUseCase(projectsRepository)
    return registerProjectUseCase
}   