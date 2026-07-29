import type { ProjectsRepository } from "@/repositories/projects_repository.js"
import { ProjectNotFound } from "../errors/project_not_found.js"
import { Prisma } from "@/@types/prisma/client.js"
import { ProjectHasAssociatedTasksError } from "../errors/project_has_tasks_error.js"


interface deleteProjectRequest {
    publicId: string
}

export class DeleteProjectUseCase {
    constructor(private projectRepository: ProjectsRepository) { }
    async execute({ publicId }: deleteProjectRequest): Promise<void> {
        try {
            const projectToDelete = await this.projectRepository.getProjectById(publicId)
            if (!projectToDelete) throw new ProjectNotFound()
            await this.projectRepository.deleteProject(publicId)
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError  &&
                error.code === 'P2003'
            ) {
                throw new ProjectHasAssociatedTasksError()
            }
            throw error
        }
    }
}
