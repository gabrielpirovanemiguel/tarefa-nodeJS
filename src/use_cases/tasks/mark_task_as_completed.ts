import type { TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"
import { TaskNotFound } from "../errors/task_not_found.js"
import type { UsersRepository } from "@/repositories/users_repository.js"
import { UserNotFound } from "../errors/user_not_found.js"
import { InvalidPermissions } from "../errors/invalid_permissions_error.js"

interface MarkTaskAsCompletedUseCaseRequest {
    publicId: string
    publicIdLoggedUser: string
    
}

type MarkTaskAsCompletedUseCaseReply = {
    task: TaskWithUsers
}

export class MarkTaskAsCompletedUseCase {
    constructor(private tasksRepository: TasksRepository,
                private usersRespository: UsersRepository
    ) {}
    async execute({publicId, publicIdLoggedUser}: MarkTaskAsCompletedUseCaseRequest): Promise<MarkTaskAsCompletedUseCaseReply>{
        try {
            const taskToMark = await this.tasksRepository.getTaskByPublicId(publicId)
            if (!taskToMark) throw new TaskNotFound()
            const userLogged = await this.usersRespository.getUserIdByPublicId(publicIdLoggedUser)
            if(!userLogged) throw new UserNotFound()
            const isUserInTask = taskToMark.taskUser.some((user) => user.id === userLogged.id)
            if (!isUserInTask) throw new InvalidPermissions()
            const task = await this.tasksRepository.markTaskAsCompleted(publicId)
            return { task }
        } catch(error) {
            throw error
        }
    }
}