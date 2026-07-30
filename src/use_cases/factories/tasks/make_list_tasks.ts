import { PrismaTasksRepository } from "@/repositories/prisma/tasks_prisma_repository.js"
import { ListTasksUseCase } from "@/use_cases/tasks/list_tasks.js"

export function makeListTasksUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const listTasksUseCase = new ListTasksUseCase(tasksRepository)
    return listTasksUseCase
}