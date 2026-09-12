import type { FastifyInstance } from 'fastify'
import { projectsRoutes } from './controllers/projects/projects-routes.js'
import { reportsRoutes } from './controllers/reports/reports-routes.js'
import { tasksRoutes } from './controllers/tasks/tasks-routes.js'
import { authRoutes } from './controllers/users/auth-routes.js'
import { usersRoutes } from './controllers/users/users-routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(usersRoutes, { prefix: '/users' })
  app.register(projectsRoutes, { prefix: '/projects' })
  app.register(tasksRoutes, { prefix: '/tasks' })
  app.register(reportsRoutes, { prefix: '/reports' })
}
