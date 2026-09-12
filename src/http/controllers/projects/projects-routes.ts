import type { FastifyInstance } from 'fastify'
import { USER_ROLE } from '@/@types/prisma/enums.js'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify-user-id-or-role.js'
import { makeReportProjects } from '../reports/make-report-projects-controller.js'
import { deleteProject } from './delete-project-controller.js'
import { getProjectById } from './get-project-by-id-controller.js'
import { getTasksInProject } from './get-tasks-in-project-controller.js'
import { registerProject } from './register-project-controller.js'
import { updateProject } from './update-project-controller.js'

export function projectsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    registerProject,
  )
  app.get('', { onRequest: [verifyJwt] }, makeReportProjects)
  app.get('/:publicIdProject', { onRequest: [verifyJwt] }, getProjectById)
  app.get(
    '/:publicIdProject/tasks',
    { onRequest: [verifyJwt] },
    getTasksInProject,
  )
  app.put(
    '/:publicIdProject',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    updateProject,
  )
  app.delete(
    '/:publicIdProject',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    deleteProject,
  )
}
