import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import type { TaskWithUsers } from '@/repositories/tasks-repository.js'
import { ProjectNotFound } from '../errors/project-not-found.js'

interface getTasksInProjectUseCaseRequest {
  publicIdProject: string
}

type getTasksInProjectUseCaseResponse = {
  tasks: TaskWithUsers[]
}

export class GetTasksInProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}
  async execute({
    publicIdProject,
  }: getTasksInProjectUseCaseRequest): Promise<getTasksInProjectUseCaseResponse> {
    const tasks =
      await this.projectsRepository.getTasksInProject(publicIdProject)
    if (tasks === null) throw new ProjectNotFound()
    return { tasks }
  }
}
