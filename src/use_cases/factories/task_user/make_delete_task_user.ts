import { PrismaTaskUserRepository } from '@/repositories/prisma/task_user_prisma_repository.js'
import { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { DeleteTaskUserUseCase } from '@/use_cases/task_user/delete_task_user.js'

export function makeDeleteTaskUserUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const taskUserRepository = new PrismaTaskUserRepository()
    const userRepository = new PrismaUsersRepository()
    const deleteTaskUserUseCase = new DeleteTaskUserUseCase(
        taskUserRepository,
        tasksRepository,
        userRepository,
    )
    return deleteTaskUserUseCase
}
