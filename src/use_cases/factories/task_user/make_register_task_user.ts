import { PrismaTaskUserRepository } from "@/repositories/prisma/task_user_prisma_repository.js"
import { PrismaTasksRepository } from "@/repositories/prisma/tasks_prisma_repository.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users_prisma_repository.js"
import { RegisterTaskUserUseCase } from "@/use_cases/task_user/register_task_user.js"

export function makeRegisterTaskUserUseCase () {
    const tasksRepository = new PrismaTasksRepository()
    const taskUserRepository = new PrismaTaskUserRepository()
    const usersRepository = new PrismaUsersRepository()
    const registerTaskUseCase = new RegisterTaskUserUseCase(
        taskUserRepository,
        tasksRepository,
        usersRepository
    )
    return registerTaskUseCase
}