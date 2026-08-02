import { PrismaProjectsRepository } from '@/repositories/prisma/projects_prisma_repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { DeleteProjectUseCase } from '@/use_cases/projects/delete_project.js'

export function makeDeleteProjectUseCase() {
    const projectsRepository = new PrismaProjectsRepository()
    const tasksRepository = new PrismaTasksRepository()
    const deleteProjectUseCase = new DeleteProjectUseCase(
        projectsRepository,
        tasksRepository,
    )

    return deleteProjectUseCase
}
