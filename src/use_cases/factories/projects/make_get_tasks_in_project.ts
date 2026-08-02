import { PrismaProjectsRepository } from '@/repositories/prisma/projects_prisma_repository.js'
import { GetTasksInProjectUseCase } from '@/use_cases/projects/get_tasks_in_project.js'

export function makeGetTasksInProjectUseCase() {
    const projectsRepository = new PrismaProjectsRepository()
    const getTasksInProjectUseCase = new GetTasksInProjectUseCase(
        projectsRepository,
    )
    return getTasksInProjectUseCase
}
