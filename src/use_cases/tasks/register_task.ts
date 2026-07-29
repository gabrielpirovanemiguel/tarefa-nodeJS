import type { Task } from '@/@types/prisma/client.js'
import type { PRIORITY } from '@/@types/prisma/enums.js'
import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import type { TasksRepository } from '@/repositories/tasks_repository.js'
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
    task: Task
}

export class RegisterTaskUseCase {
    constructor(private tasksRepository: TasksRepository, 
                private projectsRepository: ProjectsRepository
    ) {}
    async execute({
        title,
        description,
        priority,
        completed,
        deadline,
        project: projectPublicId
    }: RegisterTaskUseCaseRequest): Promise<RegisterTaskUseCaseResponse> {
        try {
            const doesProjectExist = await this.projectsRepository.getProjectById(projectPublicId)
            if (!doesProjectExist) throw new ProjectNotFound()
            const projectId = doesProjectExist.id

            const task = await this.tasksRepository.createTask({
                title,
                description,
                priority,
                completed,
                deadline,
                project: {
                    connect: {id: projectId}
                }
            })
            return { task }
        } catch (error) {
            throw error
        }
    }
}
