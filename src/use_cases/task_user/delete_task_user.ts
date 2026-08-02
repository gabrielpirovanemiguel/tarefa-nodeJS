import type { PrismaTaskUserRepository } from '@/repositories/prisma/task_user_prisma_repository.js'
import type { PrismaTasksRepository } from '@/repositories/prisma/tasks_prisma_repository.js'
import type { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { TaskNotFound } from '../errors/task_not_found.js'
import { UserNotFound } from '../errors/user_not_found.js'
import { TaskUserNotFound } from '../errors/task_user_not_found_error.js'

interface DeleteTaskUserUseCaseRequest {
    taskId: string
    userId: string
}

export class DeleteTaskUserUseCase {
    constructor(
        private taskUserRepository: PrismaTaskUserRepository,
        private tasksRepository: PrismaTasksRepository,
        private usersRepository: PrismaUsersRepository,
    ) {}

    async execute({ taskId, userId }: DeleteTaskUserUseCaseRequest) {
        try {
            const task = await this.tasksRepository.getTaskByPublicId(taskId)
            if (!task) throw new TaskNotFound()

            const user = await this.usersRepository.getUserByPublicId(userId)
            if (!user) throw new UserNotFound()

            const taksUser = await this.taskUserRepository.findTaskUser(
                task.id,
                user.id,
            )
            if (!taksUser) throw new TaskUserNotFound()

            await this.taskUserRepository.deleteTaskUser(task.id, user.id)
        } catch (error) {
            throw error
        }
    }
}
