import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'
import type { TaskWithUsers } from '@/repositories/tasks_repository.js'

interface getTasksInProjectRequest {
    publicId: string
}

type getTasksInProjectResponse = {
    tasks: TaskWithUsers[]
}

export class GetTasksInProjectUseCase {
    constructor(private projectsRepository: ProjectsRepository) { }
    async execute({
        publicId,
    }: getTasksInProjectRequest): Promise<getTasksInProjectResponse> {
        try {
            const tasks = await this.projectsRepository.getTasksInProject(publicId)
            if (tasks === null) throw new ProjectNotFound()
            return { tasks }
        } catch (error) {
            throw error
        }
    }
}
