import type { FastifyInstance } from 'fastify'
import { USER_ROLE } from '@/@types/prisma/browser.js'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify-user-id-or-role.js'
import { makeReportProjects } from './make-report-projects-controller.js'

export function reportsRoutes(app: FastifyInstance) {
  app.get(
    '/projects',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    makeReportProjects,
  )
}
