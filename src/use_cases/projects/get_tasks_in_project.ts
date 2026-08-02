import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'
import type { TaskWithUsers } from '@/repositories/tasks_repository.js'

interface getTasksInProjectRequest {
    publicIdProject: string
}

type getTasksInProjectResponse = {
    tasks: TaskWithUsers[]
}

export class GetTasksInProjectUseCase {
    constructor(private projectsRepository: ProjectsRepository) { }
    async execute({
        publicIdProject,
    }: getTasksInProjectRequest): Promise<getTasksInProjectResponse> {
        try {
            const tasks = await this.projectsRepository.getTasksInProject(publicIdProject)
            if (tasks === null) throw new ProjectNotFound()
            return { tasks }
        } catch (error) {
            throw error
        }
    }
}
