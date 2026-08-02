import type {
    TasksRepository,
    TaskWithUsers,
} from '@/repositories/tasks_repository.js'
import { TaskNotFound } from '../errors/task_not_found.js'
import { InvalidPermissions } from '../errors/invalid_permissions_error.js'
import { USER_ROLE } from '@/@types/prisma/browser.js'

interface MarkTaskAsCompletedUseCaseRequest {
    publicIdTask: string
    payLoadUser: { sub: string; role: string }
}

type MarkTaskAsCompletedUseCaseReply = {
    task: TaskWithUsers
}

export class MarkTaskAsCompletedUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({
        publicIdTask,
        payLoadUser,
    }: MarkTaskAsCompletedUseCaseRequest): Promise<MarkTaskAsCompletedUseCaseReply> {
        try {
            const taskToMark =
                await this.tasksRepository.getTaskByPublicId(publicIdTask)
            if (!taskToMark) throw new TaskNotFound()
            const { sub: publicIdUser, role } = payLoadUser

            const isUserInTask = await this.tasksRepository.findUserInTask(
                publicIdUser,
                publicIdTask,
            )
            if (!isUserInTask && role !== USER_ROLE.admin)
                throw new InvalidPermissions()
            const task =
                await this.tasksRepository.markTaskAsCompleted(publicIdTask)
            return { task }
        } catch (error) {
            throw error
        }
    }
}
