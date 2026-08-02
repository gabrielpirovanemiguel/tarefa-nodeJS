import type { PRIORITY } from '@/@types/prisma/enums.js'
import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import type {
    TasksRepository,
    TaskWithUsers,
} from '@/repositories/tasks_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'

interface RegisterTaskUseCaseRequest {
    title: string
    description?: string
    priority: PRIORITY
    completed: boolean
    deadline?: Date
    project: string
}

type RegisterTaskUseCaseResponse = {
    task: TaskWithUsers
}

export class RegisterTaskUseCase {
    constructor(
        private tasksRepository: TasksRepository,
        private projectsRepository: ProjectsRepository,
    ) {}
    async execute({
        title,
        description,
        priority,
        completed,
        deadline,
        project: publicIdProject,
    }: RegisterTaskUseCaseRequest): Promise<RegisterTaskUseCaseResponse> {
        try {
            const doesProjectExist =
                await this.projectsRepository.getProjectByPublicId(
                    publicIdProject,
                )
            if (!doesProjectExist) throw new ProjectNotFound()
            const projectId = doesProjectExist.id

            const task = await this.tasksRepository.createTask({
                title,
                description,
                priority,
                completed,
                deadline,
                projectId,
            })
            return { task }
        } catch (error) {
            throw error
        }
    }
}
