import type { Project, STATUS } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'

export interface UpdateProjectUseCaseRequest {
    publicIdProject: string
    name?: string
    description?: string
    status?: STATUS | undefined
}

type UpdateProjectUseCaseResponse = {
    project: Project
}

export class UpdateProjectUseCase {
    constructor(private projectsRepository: ProjectsRepository) {}

    async execute({
        publicIdProject,
        name,
        description,
        status,
    }: UpdateProjectUseCaseRequest): Promise<UpdateProjectUseCaseResponse> {
        try {
            const ProjectToUpdate =
                await this.projectsRepository.getProjectByPublicId(
                    publicIdProject,
                )
            if (!ProjectToUpdate) throw new ProjectNotFound()

            const project = await this.projectsRepository.updateProject(
                ProjectToUpdate.publicId,
                { name, description, status },
            )

            return { project }
        } catch (error) {
            throw error
        }
    }
}
