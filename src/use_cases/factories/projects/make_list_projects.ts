import { PrismaProjectsRepository } from "@/repositories/prisma/projects_prisma_repository.js"
import { ListProjectsUseCase } from "@/use_cases/projects/list_projects.js"


export function makeListProjectsUseCase() {
    const ProjectsRepository = new PrismaProjectsRepository()
    const listProjectsUseCase = new ListProjectsUseCase(ProjectsRepository)
    return listProjectsUseCase
}
