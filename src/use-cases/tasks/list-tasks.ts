import type {
  ListTaskQuery,
  TasksRepository,
  TaskWithUsers,
} from '@/repositories/tasks-repository.js'

interface ListTasksUseCaseRequest {
  query: ListTaskQuery
}

interface ListTasksUseCaseResponse {
  tasks: TaskWithUsers[]
}

export class ListTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  async execute({
    query,
  }: ListTasksUseCaseRequest): Promise<ListTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.listTasks(query)
    return { tasks }
  }
}
