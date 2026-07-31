import type { TaskUserRepository } from "@/repositories/task_user_repository.js"
import type { TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"
import { TaskNotFound } from "../errors/task_not_found.js"
import type { UsersRepository } from "@/repositories/users_repository.js"
import type { User } from "@/@types/prisma/client.js"
import { UsersNotFound } from "../errors/users_not_found.js"

interface RegisterTaskUserUseCaseRequest {
    publicIdTask: string
    userIds: number[]
}

type RegisterTaskUserUseCaseResponse = {
    task: TaskWithUsers
}

export class RegisterTaskUserUseCase {
    constructor(
        private taskUserRepository: TaskUserRepository,
        private tasksRepository: TasksRepository,
        private usersRepository: UsersRepository
    ) {}
    async execute({ publicIdTask, userIds }: RegisterTaskUserUseCaseRequest): Promise<RegisterTaskUserUseCaseResponse> {
        try {
            const idTask = await this.tasksRepository.getIdByPublicId(publicIdTask)
            if (!idTask) throw new TaskNotFound()

            const doUsersExist: User[] = await this.usersRepository.findManyUsersByIds(userIds)
            if (doUsersExist.length !== userIds.length) throw new UsersNotFound()

            await this.taskUserRepository.createTaskUser(idTask.id, userIds)

            const task: TaskWithUsers | null = await this.tasksRepository.getTaskByPublicId(publicIdTask)

            return { task: task! } 

        } catch (error) {
            throw error
        }
    }
}