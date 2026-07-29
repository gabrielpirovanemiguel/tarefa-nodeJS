import type { PRIORITY } from '@/@types/prisma/client.js'
import type { TaskWithUsers } from '@/repositories/tasks_repository.js'




type HTTPTask = {
    id: string
    title: string
    description: string | null
    deadline: Date | null
    project: number
    priority: PRIORITY
    completed: boolean
    createdAt: Date
    updatedAt: Date
    assignedUsers: {
        id: number
        name: string
        email: string
        role: string
    }[]
}

export class TaskPresenter {
    static toHTTP(task: TaskWithUsers): HTTPTask
    static toHTTP(tasks: TaskWithUsers[]): HTTPTask[]
    static toHTTP(input: TaskWithUsers | TaskWithUsers[]): HTTPTask | HTTPTask[] {
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
            project: input.projectId,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            assignedUsers: input.taskUser.map((tu) => ({
                id: tu.user.id,
                name: tu.user.name,
                email: tu.user.email,
                role: tu.user.role
            }))
        }
    }
}
