import type { PRIORITY } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import type {
  TasksRepository,
  TaskWithUsers,
} from '@/repositories/tasks-repository.js'
import { ProjectNotFound } from '../errors/project-not-found.js'
import { TaskNotFound } from '../errors/task-not-found.js'

interface UpdateTaskUseCaseRequest {
  publicIdTask: string
  title?: string
  description?: string
  priority?: PRIORITY
  completed?: boolean
  deadline?: Date
  projectId?: number
}

interface UpdateTaskUseCaseResponse {
  task: TaskWithUsers
}

export class UpdateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}
  async execute({
    publicIdTask,
    title,
    description,
    priority,
    completed,
    deadline,
    projectId,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    if (projectId) {
      const doesProjectIdToUpdateExist =
        await this.projectsRepository.getProjectById(projectId)
      if (!doesProjectIdToUpdateExist) throw new ProjectNotFound()
    }

    const doesTaskToUpdateExist =
      await this.tasksRepository.getTaskByPublicId(publicIdTask)
    if (!doesTaskToUpdateExist) throw new TaskNotFound()

    const task = await this.tasksRepository.updateTask(publicIdTask, {
      title,
      description,
      priority,
      completed,
      deadline,
      projectId,
    })

    return { task }
  }
}
