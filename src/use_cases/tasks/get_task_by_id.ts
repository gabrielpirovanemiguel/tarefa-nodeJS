import type {
    TasksRepository,
    TaskWithUsers,
} from '@/repositories/tasks_repository.js'
import { TaskNotFound } from '../errors/task_not_found.js'

interface GetTaskByIdUseCaseRequest {
    publicIdTask: string
}

type GetTaskByIdUseCaseResponse = {
    task: TaskWithUsers
}

export class GetTaskByIdUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({
        publicIdTask,
    }: GetTaskByIdUseCaseRequest): Promise<GetTaskByIdUseCaseResponse> {
        try {
            const task =
                await this.tasksRepository.getTaskByPublicId(publicIdTask)
            if (!task) throw new TaskNotFound()
            return { task }
        } catch (error) {
            throw error
        }
    }
}
