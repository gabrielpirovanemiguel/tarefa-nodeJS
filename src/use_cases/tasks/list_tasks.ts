import type { ListTaskQuery, TasksRepository, TaskWithUsers } from "@/repositories/tasks_repository.js"

interface ListTasksUseCaseRequest {
    query: ListTaskQuery
}

interface ListTasksUseCaseResponse {
    tasks: TaskWithUsers[]
}

export class ListTasksUseCase {
    constructor(private tasksRepository: TasksRepository) {}
    async execute({ query }: ListTasksUseCaseRequest): Promise<ListTasksUseCaseResponse> {
        try {
            const tasks = await this.tasksRepository.listTasks(query)
            return { tasks }
        } catch (error) {
            throw error
        }   
    }
}