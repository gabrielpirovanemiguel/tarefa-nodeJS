import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'

interface getProjectByIdUseCaseRequest {
    publicIdProject: string
}

type getProjectByIdUseCaseResponse = {
    project: Project
}

export class GetProjectByIdUseCase {
    constructor(private projectRepository: ProjectsRepository) {}
    async execute({
        publicIdProject,
    }: getProjectByIdUseCaseRequest): Promise<getProjectByIdUseCaseResponse> {
        try {
            const project = await this.projectRepository.getProjectByPublicId(publicIdProject)
            if (!project) throw new ProjectNotFound()
            return { project }
        } catch (error) {
            throw error
        }
    }
}
