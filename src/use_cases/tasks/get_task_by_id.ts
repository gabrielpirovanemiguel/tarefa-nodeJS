import type { TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"
import { TaskNotFound } from "../errors/task_not_found.js"

interface GetTaskByIdUseCaseRequest {
    publicId: string
}

type GetTaskByIdUseCaseResponse = {
    task: TaskWithUsers
}

export class GetTaskByIdUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({publicId}: GetTaskByIdUseCaseRequest): Promise<GetTaskByIdUseCaseResponse> {
        try {
            const task = await this.tasksRepository.getTaskById(publicId)
            if (!task) throw new TaskNotFound()
            return { task }
        } catch (error) {
            throw error
        }
    }
}