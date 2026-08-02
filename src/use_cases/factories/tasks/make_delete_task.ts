import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { DeleteTaskUseCase } from '@/use_cases/tasks/delete_task.js'

export function makeDeleteTaskUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository)
    return deleteTaskUseCase
}
