import type { TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"
import { TaskNotFound } from "../errors/task_not_found.js"
import { InvalidPermissions } from "../errors/invalid_permissions_error.js"
import { USER_ROLE } from "@/@types/prisma/browser.js"

interface MarkTaskAsCompletedUseCaseRequest {
    publicId: string
    payLoadUser: {sub: string, role: string}

}

type MarkTaskAsCompletedUseCaseReply = {
    task: TaskWithUsers
}

export class MarkTaskAsCompletedUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({publicId, payLoadUser}: MarkTaskAsCompletedUseCaseRequest): Promise<MarkTaskAsCompletedUseCaseReply>{
        try {
            const taskToMark = await this.tasksRepository.getTaskByPublicId(publicId)
            if (!taskToMark) throw new TaskNotFound()
            const { sub: publicIdLoggedUser, role } = payLoadUser

            const isUserInTask = await this.tasksRepository.findUserInTask(publicIdLoggedUser, publicId)
            if (!isUserInTask && role !== USER_ROLE.admin) throw new InvalidPermissions()
            const task = await this.tasksRepository.markTaskAsCompleted(publicId)
            return { task }
        } catch(error) {
            throw error
        }
    }
}