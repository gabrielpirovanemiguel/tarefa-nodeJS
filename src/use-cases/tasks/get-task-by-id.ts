import type {
  TasksRepository,
  TaskWithUsers,
} from '@/repositories/tasks-repository.js'
import { TaskNotFound } from '../errors/task-not-found.js'

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
    const task = await this.tasksRepository.getTaskByPublicId(publicIdTask)
    if (!task) throw new TaskNotFound()
    return { task }
  }
}
