import type { TaskUserRepository } from '@/repositories/task-user-repository.js'
import type {
  TasksRepository,
  TaskWithUsers,
} from '@/repositories/tasks-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserNotFound } from '../errors/user-not-found.js'

interface getTasksWithUserUseCaseRequest {
  publicIdUser: string
}

type getTasksWithUserUseCaseResponse = {
  tasks: TaskWithUsers[]
}

export class GetTasksWithUserUseCase {
  constructor(
    private taskUserRepository: TaskUserRepository,
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({
    publicIdUser,
  }: getTasksWithUserUseCaseRequest): Promise<getTasksWithUserUseCaseResponse> {
    const user = await this.usersRepository.getUserByPublicId(publicIdUser)
    if (!user) throw new UserNotFound()
    const taskUser = await this.taskUserRepository.findTaskUserByUserIds(
      user.id,
    )
    const tasksId = taskUser.map((tu) => tu.taskId)
    let tasks: TaskWithUsers[] = []
    if (tasksId.length !== 0)
      tasks = await this.tasksRepository.getTasksById(tasksId)
    return { tasks }
  }
}
