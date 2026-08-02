import type { Prisma, Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '../projects_repository.js'
import { prisma } from '@/libs/prisma.js'
import { taskWithUsersInclude } from '../tasks_repository.js'

export class PrismaProjectsRepository implements ProjectsRepository {
    async createProject(data: Prisma.ProjectCreateInput) {
        return await prisma.project.create({ data })
    }

    async listProjects() {
        return await prisma.project.findMany()
    }

    async getProjectByPublicId(publicIdProject: string) {
        return await prisma.project.findUnique({
            where: { publicId: publicIdProject }
        })
    }

    async getProjectById(id: number) {
        return await prisma.project.findUnique({
            where: { id }
        })
    }

    async updateProject(publicIdProject: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
        return await prisma.project.update({
            where: { publicId: publicIdProject },
            data,
        })
    }

    async deleteProject(publicIdProject: string) {
        await prisma.project.delete({
            where: { publicId: publicIdProject },
        })
    }

    async getTasksInProject(publicIdProject: string) {
        const project = await prisma.project.findUnique({
            where: { publicId: publicIdProject },
            include: { tasks: {include: taskWithUsersInclude} },
        })

        return project?.tasks ?? null
    }
}
