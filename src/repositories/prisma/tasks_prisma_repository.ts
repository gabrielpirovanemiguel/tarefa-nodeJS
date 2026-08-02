import type { Prisma } from '@/@types/prisma/client.js'
import {
    taskWithUsersInclude,
    type ListTaskQuery,
    type TasksRepository,
} from '../tasks_repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaTasksRepository implements TasksRepository {
    async createTask(data: Prisma.TaskUncheckedCreateInput) {
        return await prisma.task.create({
            data,
            include: taskWithUsersInclude,
        })
    }

    async countTasksByProjectId(projectId: number) {
        return await prisma.task.count({
            where: {
                projectId,
            },
        })
    }

    async getTaskByPublicId(publicIdTask: string) {
        return await prisma.task.findUnique({
            where: {
                publicId: publicIdTask,
            },
            include: taskWithUsersInclude,
        })
    }

    async listTasks(query: ListTaskQuery) {
        const { completed, priority, sort, order } = query
        const where: Prisma.TaskWhereInput = {
            completed: completed,
            priority: priority,
        }

        return await prisma.task.findMany({
            where,
            orderBy: { [sort ?? 'title']: order ?? 'asc' },
            include: taskWithUsersInclude,
        })
    }

    async updateTask(
        publicIdTask: string,
        data: Prisma.TaskUncheckedUpdateInput,
    ) {
        return await prisma.task.update({
            where: { publicId: publicIdTask },
            data,
            include: taskWithUsersInclude,
        })
    }

    async deleteTask(publicIdTask: string) {
        await prisma.task.delete({ where: { publicId: publicIdTask } })
    }

    async markTaskAsCompleted(publicIdTask: string) {
        return await prisma.task.update({
            where: { publicId: publicIdTask },
            data: { completed: true },
            include: taskWithUsersInclude,
        })
    }

    async findUserInTask(publicIdUser: string, publicIdTask: string) {
        const taskUser = await prisma.taskUser.findFirst({
            where: {
                task: { publicId: publicIdTask },
                user: { publicId: publicIdUser },
            },
            select: { id: true },
        })

        return taskUser !== null
    }

    async getIdByPublicId(publicIdTask: string) {
        return await prisma.task.findUnique({
            where: { publicId: publicIdTask },
            select: { id: true },
        })
    }

    async getTasksById(id: number[]) {
        return await prisma.task.findMany({
            where: { id: { in: id } },
            include: taskWithUsersInclude,
        })
    }
}
