import type { Prisma } from "@/@types/prisma/client.js";
import { taskWithUsersInclude, type ListTaskQuery, type TasksRepository, type TaskWithUsers} from "../tasks_repository.js";
import { prisma } from "@/libs/prisma.js";
import { includes } from "zod";


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
        const { completed, priority, sort, order, page} = query
        const limit = 4
        const skip = (page - 1) * limit
        const where: Prisma.TaskWhereInput = {
            completed: completed,
            priority: priority,

        }

        const tasks = await prisma.task.findMany({
            where,
            skip,
            take: limit,
            orderBy: {[sort ?? 'title']: order?? 'asc'},
            include: taskWithUsersInclude
        })

        const totalCount = await prisma.task.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        return {
            data: tasks,
            totalCount,
            totalPages,
            currentPage: page
        }
    }

    async updateTask(publicId: string, data: Prisma.TaskUncheckedUpdateInput) {
        return await prisma.task.update({
            where: {publicId},
            data,
            include: taskWithUsersInclude
        })
    }

    async deleteTask(publicId: string){
        await prisma.task.delete({where: {publicId}})
    }

    async markTaskAsCompleted(publicId: string) {
        return await prisma.task.update({
            where: {publicId, completed: false},
            data: {completed: true},
            include: taskWithUsersInclude
        })
    }
}