import type { PrismaTaskUserRepository } from '@/repositories/prisma/task-user-prisma-repository.js'
import type { PrismaTasksRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import type { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { TaskNotFound } from '../errors/task-not-found.js'
import { TaskUserNotFound } from '../errors/task-user-not-found-error.js'
import { UserNotFound } from '../errors/user-not-found.js'

interface DeleteTaskUserUseCaseRequest {
  taskId: string
  userId: string
}

export class DeleteTaskUserUseCase {
  constructor(
    private taskUserRepository: PrismaTaskUserRepository,
    private tasksRepository: PrismaTasksRepository,
    private usersRepository: PrismaUsersRepository,
  ) {}

  async execute({ taskId, userId }: DeleteTaskUserUseCaseRequest) {
    const task = await this.tasksRepository.getTaskByPublicId(taskId)
    if (!task) throw new TaskNotFound()

    const user = await this.usersRepository.getUserByPublicId(userId)
    if (!user) throw new UserNotFound()

    const taksUser = await this.taskUserRepository.findTaskUser(
      task.id,
      user.id,
    )
    if (!taksUser) throw new TaskUserNotFound()

    await this.taskUserRepository.deleteTaskUser(task.id, user.id)
  }
}
