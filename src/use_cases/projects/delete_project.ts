import type { ProjectsRepository } from "@/repositories/projects_repository.js"
import { ProjectNotFound } from "../errors/project_not_found.js"
import { ProjectHasAssociatedTasksError } from "../errors/project_has_tasks_error.js"
import type { TasksRepository } from "@/repositories/tasks_repository.js"


interface deleteProjectRequest {
    publicId: string
}

export class DeleteProjectUseCase {
    constructor(private projectRepository: ProjectsRepository,
                private tasksRepository: TasksRepository
    ) { }
    async execute({ publicId }: deleteProjectRequest): Promise<void> {
        try {
            const projectToDelete = await this.projectRepository.getProjectByPublicId(publicId)
            if (!projectToDelete) throw new ProjectNotFound()

            const taskCount = await this.tasksRepository.countByProjectId(projectToDelete.id)
            if (taskCount > 0) throw new ProjectHasAssociatedTasksError()

            await this.projectRepository.deleteProject(publicId)
        } catch (error) {
            throw error
        }
    }
}
