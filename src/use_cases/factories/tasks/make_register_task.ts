import { PrismaProjectsRepository } from '@/repositories/prisma/projects_prisma_repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { RegisterTaskUseCase } from '@/use_cases/tasks/register_task.js'

export function makeRegisterTaskUseCase() {
    const projectsRepository = new PrismaProjectsRepository()
    const tasksRepository = new PrismaTasksRepository()
    const registerProjectUseCase = new RegisterTaskUseCase(
        tasksRepository,
        projectsRepository,
    )
    return registerProjectUseCase
}
