import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import { ProjectNotFound } from '../errors/project-not-found.js'

interface getProjectByIdUseCaseRequest {
  publicIdProject: string
}

type getProjectByIdUseCaseResponse = {
  project: Project
}

export class GetProjectByIdUseCase {
  constructor(private projectRepository: ProjectsRepository) {}
  async execute({
    publicIdProject,
  }: getProjectByIdUseCaseRequest): Promise<getProjectByIdUseCaseResponse> {
    const project =
      await this.projectRepository.getProjectByPublicId(publicIdProject)
    if (!project) throw new ProjectNotFound()
    return { project }
  }
}
