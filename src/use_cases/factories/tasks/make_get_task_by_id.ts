import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { GetTaskByIdUseCase } from '@/use_cases/tasks/get_task_by_id.js'

export function makeGetTaskByIdUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository)
    return getTaskByIdUseCase
}
