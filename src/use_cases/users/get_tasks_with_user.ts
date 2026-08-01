import type { ProjectsRepository } from '@/repositories/projects_repository.js'
import { ProjectNotFound } from '../errors/project_not_found.js'
import type { TaskWithUsers } from '@/repositories/tasks_repository.js'
import type { TaskUserRepository } from '@/repositories/task_user_repository.js'
import type { UsersRepository } from '@/repositories/users_repository.js'
import { UsersNotFound } from '../errors/users_not_found.js'

interface getTasksWithUserRequest {
    publicId: string
}

type getTasksWithUserResponse = {
    tasks: TaskWithUsers[]
}

export class GetTasksWithUserUseCase {
    constructor(
        private taskUserRepository: TaskUserRepository,
        private usersRepository: UsersRepository
    ) { }
    async execute({
        publicId,
    }: getTasksWithUserRequest): Promise<getTasksWithUserResponse> {
        try {
            const user = await this.usersRepository.getUserByPublicId(publicId)
            if (!user) throw new UsersNotFound()
            const tasks = await this.taskUserRepository.findTaskUserByUserId(user.id)
            return { tasks }
        } catch (error) {
            throw error
        }
    }
}
