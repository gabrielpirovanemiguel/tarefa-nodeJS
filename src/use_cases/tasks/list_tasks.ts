import type { ListTaskQuery, ListTaskResponse, TasksRepository } from "@/repositories/tasks_repository.js"

interface ListTasksUseCaseRequest {
    query: ListTaskQuery
}

interface ListTasksUseCaseResponse {
    dataPackage: ListTaskResponse
}

export class ListTasksUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({ query }: ListTasksUseCaseRequest): Promise<ListTasksUseCaseResponse> {
        try {
            const dataPackage = await this.tasksRepository.list(query)
            return { dataPackage }

        } catch (error) {
            throw error
        }   
    }
}