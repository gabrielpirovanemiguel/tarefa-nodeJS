import type { Prisma, Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '../projects_repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaProjectsRepository implements ProjectsRepository {
    async createProject(data: Prisma.ProjectCreateInput){
        return await prisma.project.create({ data })
    }

    async listProjects() {
        return await prisma.project.findMany()
    }

    async getProjectByPublicId(publicId: string) {
        return await prisma.project.findUnique({
            where: { publicId }
        })
    }

    async getProjectById(id: number) {
        return await prisma.project.findUnique({
            where: {id}
        })
    }

    async updateProject(publicId: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
        return await prisma.project.update({
            where: { publicId },
            data,
        })
    }

    async deleteProject(publicId: string): Promise<void> {
        await prisma.project.delete({
            where: { publicId },
        })
    }
}
