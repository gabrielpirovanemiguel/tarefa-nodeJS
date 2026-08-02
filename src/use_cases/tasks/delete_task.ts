import type { TasksRepository } from '@/repositories/tasks_repository.js'
import { TaskNotFound } from '../errors/task_not_found.js'

interface DeleteTaskUseCaseRequest {
    publicIdTask: string
}

export class DeleteTaskUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({ publicIdTask }: DeleteTaskUseCaseRequest): Promise<void> {
        try {
            const doesTaskExist =
                await this.tasksRepository.getTaskByPublicId(publicIdTask)
            if (!doesTaskExist) throw new TaskNotFound()

            await this.tasksRepository.deleteTask(publicIdTask)
        } catch (error) {
            throw error
        }
    }
}
