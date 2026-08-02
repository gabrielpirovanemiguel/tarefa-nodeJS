import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'
import type { TaskWithUsers } from '@/repositories/tasks_repository.js'

interface getTasksInProjectUseCaseRequest {
    publicIdProject: string
}

type getTasksInProjectUseCaseResponse = {
    tasks: TaskWithUsers[]
}

export class GetTasksInProjectUseCase {
    constructor(private projectsRepository: ProjectsRepository) { }
    async execute({
        publicIdProject,
    }: getTasksInProjectUseCaseRequest): Promise<getTasksInProjectUseCaseResponse> {
        try {
            const tasks = await this.projectsRepository.getTasksInProject(publicIdProject)
            if (tasks === null) throw new ProjectNotFound()
            return { tasks }
        } catch (error) {
            throw error
        }
    }
}
