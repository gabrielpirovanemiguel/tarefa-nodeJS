import type { Prisma, Project } from '@/@types/prisma/client.js'
import type { TaskWithUsers } from './tasks_repository.js'

export interface ProjectsRepository {
    createProject(data: Prisma.ProjectCreateInput): Promise<Project>
    listProjects(): Promise<Project[]>
    getProjectByPublicId(publicIdProject: string): Promise<Project | null>
    getTasksInProject(publicIdProject: string): Promise<TaskWithUsers[] | null>
    getProjectById(id: number): Promise <Project | null>
    updateProject(publicIdProject: string, data: Prisma.ProjectUpdateInput): Promise<Project>
    deleteProject(publicIdProject: string): Promise<void>
}
