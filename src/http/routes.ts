import { type FastifyInstance } from 'fastify'
import { usersRoutes } from './controllers/users/users_routes.js'
import { projectsRoutes } from './controllers/projects/projects_routes.js'

export async function appRoutes(app: FastifyInstance) {
    app.register(usersRoutes, { prefix: '/users' })
    app.register(projectsRoutes, { prefix: '/projects' })
}
