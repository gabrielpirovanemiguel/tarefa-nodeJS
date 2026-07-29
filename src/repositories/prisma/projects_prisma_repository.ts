import type { Prisma, Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '../projects_repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaProjectsRepository implements ProjectsRepository {
    async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
        return await prisma.project.create({ data })
    }

    async listProjects(): Promise<Project[]> {
        return await prisma.project.findMany()
    }

    async getProjectById(publicId: string): Promise<Project | null> {
        return await prisma.project.findUnique({
            where: { publicId },
        })
    }

    async updateProject(publicId: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
        return await prisma.project.update({
            where: { publicId },
            data,
        })
    }
}
