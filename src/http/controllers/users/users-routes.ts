import type { FastifyInstance } from 'fastify'
import { USER_ROLE } from '@/@types/prisma/enums.js'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyRole } from '@/http/middlewares/verify-role.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify-user-id-or-role.js'
import { deleteUser } from './delete-users.js'
import { getUserById } from './get-by-id-controller.js'
import { getTasksWithUser } from './get-tasks-with-user-controller.js'
import { listUsers } from './list-users-controller.js'
import { updateUser } from './update-controller.js'

export async function usersRoutes(app: FastifyInstance) {
  app.get('', { onRequest: [verifyJwt] }, listUsers)
  app.get('/:publicIdUser', { onRequest: [verifyJwt] }, getUserById)
  app.get('/:publicIdUser/tasks', { onRequest: [verifyJwt] }, getTasksWithUser)
  app.put(
    '/:publicIdUser',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    updateUser,
  )
  app.delete(
    '/:publicIdUser',
    { onRequest: [verifyJwt, verifyRole([USER_ROLE.admin])] },
    deleteUser,
  )
}
