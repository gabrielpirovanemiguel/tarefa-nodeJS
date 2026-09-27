import type { CachedTasksRepository } from '@/repositories/redis/cached-tasks-repository.js'
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
  constructor(private tasksRepository: CachedTasksRepository) {}
  async execute({
    query,
  }: ListTasksUseCaseRequest): Promise<ListTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.list(query)
    return { tasks }
  }
}
