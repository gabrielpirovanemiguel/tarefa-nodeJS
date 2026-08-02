import { PrismaProjectsRepository } from '@/repositories/prisma/projects_prisma_repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { UpdateTaskUseCase } from '@/use_cases/tasks/update_task.js'

export function makeUpdateTaskUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const projectsRepository = new PrismaProjectsRepository()
    const updateTaskUseCase = new UpdateTaskUseCase(
        tasksRepository,
        projectsRepository,
    )
    return updateTaskUseCase
}
