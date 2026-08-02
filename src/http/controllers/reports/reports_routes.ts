import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import type { FastifyInstance } from 'fastify'
import { makeReportProjects } from './make_report_projects_controller.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify_user_id_or_role.js'
import { USER_ROLE } from '@/@types/prisma/browser.js'

export function reportsRoutes(app: FastifyInstance) {
    app.get(
        '/projects',
        { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
        makeReportProjects,
    )
}
