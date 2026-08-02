import type { ProjectsRepository } from "@/repositories/projects_repository.js"
import { ProjectNotFound } from "../errors/project_not_found.js"
import { ProjectHasAssociatedTasksError } from "../errors/project_has_tasks_error.js"
import type { TasksRepository } from "@/repositories/tasks_repository.js"


interface deleteProjectRequest {
    publicIdProject: string
}

export class DeleteProjectUseCase {
    constructor(private projectRepository: ProjectsRepository,
                private tasksRepository: TasksRepository
    ) { }
    async execute({ publicIdProject }: deleteProjectRequest): Promise<void> {
        try {
            const projectToDelete = await this.projectRepository.getProjectByPublicId(publicIdProject)
            if (!projectToDelete) throw new ProjectNotFound()

            const taskCount = await this.tasksRepository.countTasksByProjectId(projectToDelete.id)
            if (taskCount > 0) throw new ProjectHasAssociatedTasksError()

            await this.projectRepository.deleteProject(publicIdProject)
        } catch (error) {
            throw error
        }
    }
}
