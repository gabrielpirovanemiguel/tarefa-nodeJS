import { PrismaProjectsRepository } from "@/repositories/prisma/projects_prisma_repository.js"
import { GetProjectByIdUseCase } from "@/use_cases/projects/get_project_by_id.js"


export function makeGetProjectById() {
    const projectRepository = new PrismaProjectsRepository()
    const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository)
    return getProjectByIdUseCase
}
