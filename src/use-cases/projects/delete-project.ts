import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import type { TasksRepository } from '@/repositories/tasks-repository.js'
import { ProjectHasAssociatedTasksError } from '../errors/project-has-tasks-error.js'
import { ProjectNotFound } from '../errors/project-not-found.js'

interface deleteProjectUseCaseRequest {
  publicIdProject: string
}

export class DeleteProjectUseCase {
  constructor(
    private projectRepository: ProjectsRepository,
    private tasksRepository: TasksRepository,
  ) {}
  async execute({
    publicIdProject,
  }: deleteProjectUseCaseRequest): Promise<void> {
    const projectToDelete =
      await this.projectRepository.getProjectByPublicId(publicIdProject)
    if (!projectToDelete) throw new ProjectNotFound()

    const taskCount = await this.tasksRepository.countTasksByProjectId(
      projectToDelete.id,
    )
    if (taskCount > 0) throw new ProjectHasAssociatedTasksError()

    await this.projectRepository.deleteProject(publicIdProject)
  }
}
