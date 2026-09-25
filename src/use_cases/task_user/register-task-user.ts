import type { TaskUserRepository } from '@/repositories/task-user-repository.js'
import type {
  TasksRepository,
  TaskWithUsers,
} from '@/repositories/tasks-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { TaskNotFound } from '../errors/task-not-found.js'

import { UsersNotFound } from '../errors/users-not-found.js'

interface RegisterTaskUserUseCaseRequest {
  publicIdTask: string
  userIds: string[]
}

interface RegisterTaskUserUseCaseResponse  {
  task: TaskWithUsers
}

export class RegisterTaskUserUseCase {
  constructor(
    private taskUserRepository: TaskUserRepository,
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({
    publicIdTask,
    userIds,
  }: RegisterTaskUserUseCaseRequest): Promise<RegisterTaskUserUseCaseResponse> {
    const idTask = await this.tasksRepository.getIdByPublicId(publicIdTask)
    if (!idTask) throw new TaskNotFound()

    const users = await this.usersRepository.findManyUsersByPublicIds(userIds)
    if (users.length !== userIds.length) throw new UsersNotFound()

    const internalIds = users.map((u) => u.id)
    await this.taskUserRepository.createTaskUser(idTask.id, internalIds)

    const task = await this.tasksRepository.getTaskByPublicId(publicIdTask)
    return {task: task!}
  }
}
