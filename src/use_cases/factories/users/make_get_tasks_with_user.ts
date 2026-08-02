import { PrismaTaskUserRepository } from '@/repositories/prisma/task_user_prisma_repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { GetTasksWithUserUseCase } from '@/use_cases/users/get_tasks_with_user.js'

export function makeGetTasksWithUserUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const taskUserRepository = new PrismaTaskUserRepository()
    const userRepository = new PrismaUsersRepository()
    const getTasksWithUserUseCase = new GetTasksWithUserUseCase(
        taskUserRepository,
        tasksRepository,
        userRepository,
    )
    return getTasksWithUserUseCase
}
