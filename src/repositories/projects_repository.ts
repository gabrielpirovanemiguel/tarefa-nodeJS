import type { Prisma, Project } from '@/@types/prisma/client.js'
import type { TaskWithUsers } from './tasks_repository.js'

export interface ProjectsRepository {
    createProject(data: Prisma.ProjectCreateInput): Promise<Project>
    listProjects(): Promise<Project[]>
    getProjectByPublicId(publicId: string): Promise<Project | null>
    getTasksInProject(publicId: string): Promise<TaskWithUsers[] | null>
    getProjectById(id: number): Promise <Project | null>
    updateProject(publicId: string, data: Prisma.ProjectUpdateInput): Promise<Project>
    deleteProject(publicId: string): Promise<void>
}
