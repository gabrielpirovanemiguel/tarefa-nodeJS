import type { PRIORITY, Task } from '@/@types/prisma/client.js'
import type { TaskWithUsers } from '@/repositories/tasks_repository.js'




type HTTPTaskWithUser = {
    id: string
    title: string
    description: string | null
    deadline: Date | null
    projectId: string
    priority: PRIORITY
    completed: boolean
    createdAt: Date
    updatedAt: Date
    assignedUsers: {
        id: string
        name: string
        email: string
        role: string
    }[]
}

type HTTPTasks = {
    id: string
    title: string
    description: string | null
    deadline: Date | null
    projectId: string
    priority: PRIORITY
    completed: boolean
    createdAt: Date
    updatedAt: Date
}

export class TaskPresenter {
    static toHTTP(task: TaskWithUsers): HTTPTaskWithUser
    static toHTTP(tasks: TaskWithUsers[]): HTTPTaskWithUser[]
    static toHTTP(input: TaskWithUsers | TaskWithUsers[]): HTTPTaskWithUser | HTTPTaskWithUser[] {
        if (Array.isArray(input)) {
            return input.map((p) => this.toHTTP(p))
        }

        return {
            id: input.publicId,
            title: input.title,
            description: input.description,
            priority: input.priority,
            completed: input.completed,
            deadline: input.deadline,
            projectId: input.project.publicId,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            assignedUsers: input.taskUser.map((tu) => ({
                id: tu.user.publicId,
                name: tu.user.name,
                email: tu.user.email,
                role: tu.user.role
            }))
        }
    }
}
