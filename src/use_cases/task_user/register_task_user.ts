import type { TaskUserRepository } from "@/repositories/task_user_repository.js"
import type { TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"
import { TaskNotFound } from "../errors/task_not_found.js"
import type { UsersRepository } from "@/repositories/users_repository.js"

import { UsersNotFound } from "../errors/users_not_found.js"

interface RegisterTaskUserUseCaseRequest {
    publicIdTask: string
    userIds: string[]
}

type RegisterTaskUserUseCaseResponse = {
    task: TaskWithUsers
}

export class RegisterTaskUserUseCase {
    constructor(
        private taskUserRepository: TaskUserRepository,
        private tasksRepository: TasksRepository,
        private usersRepository: UsersRepository
    ) { }
    async execute({ publicIdTask, userIds }: RegisterTaskUserUseCaseRequest): Promise<RegisterTaskUserUseCaseResponse> {
        const idTask = await this.tasksRepository.getIdByPublicId(publicIdTask)
        if (!idTask) throw new TaskNotFound()

        const users = await this.usersRepository.findManyUsersByPublicIds(userIds)
        if (users.length !== userIds.length) throw new UsersNotFound()

        const internalIds = users.map((u) => u.id)  
        await this.taskUserRepository.createTaskUser(idTask.id, internalIds)

        const task = await this.tasksRepository.getTaskByPublicId(publicIdTask)
        return { task: task! }
    }
}