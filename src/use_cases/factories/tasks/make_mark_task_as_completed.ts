import { PrismaTasksRepository } from "@/repositories/prisma/tasks_prisma_repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/users_prisma_repository.js";
import { MarkTaskAsCompletedUseCase } from "@/use_cases/tasks/mark_task_as_completed.js";


export function makeMarkTaskAsCompletedUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const usersRespository = new PrismaUsersRepository()
    const markTaskAsCompletedUseCase = new MarkTaskAsCompletedUseCase(tasksRepository, usersRespository)
    return markTaskAsCompletedUseCase
}