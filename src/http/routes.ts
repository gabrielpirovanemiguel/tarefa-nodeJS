import { type FastifyInstance } from 'fastify'
import { usersRoutes } from './controllers/users/users_routes.js'
import { projectsRoutes } from './controllers/projects/projects_routes.js'
import { tasksRoutes } from './controllers/tasks/tasks_routes.js'

export async function appRoutes(app: FastifyInstance) {
    app.register(usersRoutes, { prefix: '/auth' })
    app.register(projectsRoutes, { prefix: '/projects' })
    app.register(tasksRoutes, { prefix: '/tasks' })
}
