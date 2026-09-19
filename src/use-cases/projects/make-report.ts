import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import { ProjectNotFound } from '../errors/project-not-found.js'

interface arrayReport {
  projectId: string
  name: string
  totalTasks: number
  completedTasks: number
  completionPercentage: number
}

type makeReportUseCaseResponse = {
  reports: arrayReport[]
}

export class MakeReportUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}
  async execute(): Promise<makeReportUseCaseResponse> {
    const projects = await this.projectsRepository.listProjects()
    const reports = []
    for (const project of projects) {
      const tasks = await this.projectsRepository.getTasksInProject(
        project.publicId,
      )
      if (!tasks) throw new ProjectNotFound()
      const totalTasks = tasks.length
      const completedTasks = tasks.filter((task) => task.completed).length
      let completionPercentage = 0
      if (totalTasks) completionPercentage = (completedTasks / totalTasks) * 100
      reports.push({
        projectId: project.publicId,
        name: project.name,
        totalTasks: totalTasks,
        completedTasks: completedTasks,
        completionPercentage: completionPercentage,
      })
    }
    return { reports }
  }
}
