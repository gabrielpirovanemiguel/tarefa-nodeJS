import type { TaskUserRepository } from '@/repositories/task_user_repository.js'
import type { UsersRepository } from '@/repositories/users_repository.js'
import type { TasksRepository, TaskWithUsers } from '@/repositories/tasks_repository.js'
import { UserNotFound } from '../errors/user_not_found.js'

interface getTasksWithUserUseCaseRequest {
    publicIdUser: string
}

type getTasksWithUserUseCaseResponse = {
    tasks: TaskWithUsers[]
}

export class GetTasksWithUserUseCase {
    constructor(
        private taskUserRepository: TaskUserRepository,
        private tasksRepository: TasksRepository,
        private usersRepository: UsersRepository
    ) { }
    async execute({
        publicIdUser,
    }: getTasksWithUserUseCaseRequest): Promise<getTasksWithUserUseCaseResponse> {
        try {
            const user = await this.usersRepository.getUserByPublicId(publicIdUser)
            if (!user) throw new UserNotFound()
            const taskUser = await this.taskUserRepository.findTaskUserByUserIds(user.id)
            const tasksId = taskUser.map((tu) => tu.taskId)
            let tasks: TaskWithUsers[] = []
            if (tasksId.length !== 0) tasks = await this.tasksRepository.getTasksById(tasksId)
            return { tasks }
        } catch (error) {
            throw error
        }
    }
}
