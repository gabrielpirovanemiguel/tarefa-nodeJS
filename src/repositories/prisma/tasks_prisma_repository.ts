import type { Prisma } from "@/@types/prisma/client.js";
import { taskWithUsersInclude, type ListTaskQuery, type TasksRepository } from "../tasks_repository.js";
import { prisma } from "@/libs/prisma.js";



export class PrismaTasksRepository implements TasksRepository {
    async createTask(data: Prisma.TaskUncheckedCreateInput) {
        return await prisma.task.create({
            data,
            include: taskWithUsersInclude
        })
    }

    async countByProjectId(projectId: number) {
        return await prisma.task.count({
            where: {
                projectId
            }
        })
    }

    async getTaskByPublicId(publicId: string) {
        return await prisma.task.findUnique({
            where: {
                publicId
            },
            include: taskWithUsersInclude
        })
    }

    async list(query: ListTaskQuery) {
        const { completed, priority, sort, order } = query
        const where: Prisma.TaskWhereInput = {
            completed: completed,
            priority: priority,

        }

        return await prisma.task.findMany({
            where,
            orderBy: { [sort ?? 'title']: order ?? 'asc' },
            include: taskWithUsersInclude
        })
    }

    async updateTask(publicId: string, data: Prisma.TaskUncheckedUpdateInput) {
        return await prisma.task.update({
            where: { publicId },
            data,
            include: taskWithUsersInclude
        })
    }

    async deleteTask(publicId: string) {
        await prisma.task.delete({ where: { publicId } })
    }

    async markTaskAsCompleted(publicId: string) {
        return await prisma.task.update({
            where: { publicId},
            data: { completed: true },
            include: taskWithUsersInclude
        })
    }
    
    async findUserInTask(publicIdUser: string, publicIdTask: string) {
        const taskUser = await prisma.taskUser.findFirst({
            where: {
                task: { publicId: publicIdTask },
                user: { publicId: publicIdUser },
            },
            select: { id: true }, // só traz o mínimo, não precisa dos dados todos
        })

        return taskUser !== null
    }

    async getIdByPublicId(publicId: string) {
        return await prisma.task.findUnique({
            where: { publicId },
            select: { id: true }
        })
    }
}