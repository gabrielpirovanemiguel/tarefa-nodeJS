import type { TasksRepository } from "@/repositories/tasks_repository.js";
import { TaskNotFound } from "../errors/task_not_found.js";

interface DeleteTaskUseCaseRequest {
    publicId: string
}

export class DeleteTaskUseCase{
    constructor(private tasksRepository: TasksRepository) {}
    async execute({publicId}: DeleteTaskUseCaseRequest): Promise<void> {
        try {
            const doesTaskExist = await this.tasksRepository.getTaskByPublicId(publicId)
            if (!doesTaskExist) throw new TaskNotFound()
            
            await this.tasksRepository.deleteTask(publicId)
        } catch (error) {
            throw error
        }
    }
}