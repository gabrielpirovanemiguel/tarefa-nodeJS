import type { Prisma, Project } from '@/@types/prisma/client.js'

export interface ProjectsRepository {
    createProject(data: Prisma.ProjectCreateInput): Promise<Project>
    listProjects(): Promise<Project[]>
    getProjectById(publicId: string): Promise<Project | null>
}
