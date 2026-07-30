import type { PRIORITY } from "@/@types/prisma/client.js"
import type { ProjectsRepository } from "@/repositories/projects_repository.js"
import type { TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"
import { ProjectNotFound } from "../errors/project_not_found.js"
import { TaskNotFound } from "../errors/task_not_found.js"

interface UpdateTaskUseCaseRequest {
    publicId: string
    title?: string
    description?: string
    priority?: PRIORITY
    completed?: boolean
    deadline?: Date
    projectId?: number
}

interface UpdateTaskUseCaseResponse {
    task: TaskWithUsers
}

export class UpdateTaskUseCase {
    constructor(
        private tasksRepository: TasksRepository,
        private projectsRepository: ProjectsRepository
    ) { }
    async execute({
        publicId,
        title,
        description,
        priority,
        completed,
        deadline,
        projectId
    }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
        try {
            if (projectId) {
                const doesProjectIdToUpdateExist = await this.projectsRepository.getProjectById(projectId)
                if (!doesProjectIdToUpdateExist) throw new ProjectNotFound()
            }

            const doesTaskToUpdateExist = await this.tasksRepository.getTaskByPublicId(publicId)
            if (!doesTaskToUpdateExist) throw new TaskNotFound()

            const task = await this.tasksRepository.updateTask(
                publicId, {
                title,
                description,
                priority,
                completed,
                deadline,
                projectId
            }
            )

            return { task }
        } catch (error) {
            throw error
        }
    }
}