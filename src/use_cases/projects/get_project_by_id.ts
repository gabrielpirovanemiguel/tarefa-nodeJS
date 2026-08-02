import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'

interface getProjectByIdRequest {
    publicIdProject: string
}

type getProjectByIdResponse = {
    project: Project
}

export class GetProjectByIdUseCase {
    constructor(private projectRepository: ProjectsRepository) {}
    async execute({
        publicIdProject,
    }: getProjectByIdRequest): Promise<getProjectByIdResponse> {
        try {
            const project = await this.projectRepository.getProjectByPublicId(publicIdProject)
            if (!project) throw new ProjectNotFound()
            return { project }
        } catch (error) {
            throw error
        }
    }
}
