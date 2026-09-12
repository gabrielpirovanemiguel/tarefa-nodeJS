import type { TasksRepository } from '@/repositories/tasks-repository.js'
import { TaskNotFound } from '../errors/task-not-found.js'

interface DeleteTaskUseCaseRequest {
  publicIdTask: string
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  async execute({ publicIdTask }: DeleteTaskUseCaseRequest): Promise<void> {
    const doesTaskExist =
      await this.tasksRepository.getTaskByPublicId(publicIdTask)
    if (!doesTaskExist) throw new TaskNotFound()

    await this.tasksRepository.deleteTask(publicIdTask)
  }
}
