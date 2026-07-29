import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects_repository.js'

type ListProjectsUseCaseResponse = {
    projects: Project[]
}

export class ListProjectsUseCase {
    constructor(private projectsRepository: ProjectsRepository) {}

    async execute(): Promise<ListProjectsUseCaseResponse> {
        const projects = await this.projectsRepository.listProjects()
        return { projects }
    }
}
