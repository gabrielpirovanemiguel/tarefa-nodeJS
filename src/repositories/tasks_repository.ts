import type { PRIORITY, Prisma, TASK_FIELDS } from '@/@types/prisma/client.js'

export interface ListTaskQuery {
    completed?: boolean
    priority?: PRIORITY
    sort?: TASK_FIELDS
    order?: string
}

export const taskWithUsersInclude = {
    taskUser: {
        include: {
            user: {
                select: {
                    id: true,
                    publicId: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
        },
    },
    project: {
        select: { publicId: true },
    },
} satisfies Prisma.TaskInclude

export type TaskWithUsers = Prisma.TaskGetPayload<{
    include: typeof taskWithUsersInclude
}>
export interface TasksRepository {
    createTask(data: Prisma.TaskUncheckedCreateInput): Promise<TaskWithUsers>
    countTasksByProjectId(projectId: number): Promise<number>
    getTasksById(id: number[]): Promise<TaskWithUsers[]>
    getTaskByPublicId(publicIdTask: string): Promise<TaskWithUsers | null>
    getIdByPublicId(publicIdTask: string): Promise<{ id: number } | null>
    findUserInTask(publicIdUser: string, publicIdTask: string): Promise<boolean>
    listTasks(query: ListTaskQuery): Promise<TaskWithUsers[]>
    updateTask(
        publicIdTask: string,
        data: Prisma.TaskUncheckedUpdateInput,
    ): Promise<TaskWithUsers>
    deleteTask(publicIdTask: string): Promise<void>
    markTaskAsCompleted(publicIdTask: string): Promise<TaskWithUsers>
}
