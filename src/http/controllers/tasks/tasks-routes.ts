import type { FastifyInstance } from 'fastify'
import { USER_ROLE } from '@/@types/prisma/enums.js'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify-user-id-or-role.js'
import { deleteTaskUser } from '../task_user/delete-task-user-controller.js'
import { registerTaskUser } from '../task_user/register-task-user-controller.js'
import { deleteTask } from './delete-task-controller.js'
import { getTaskById } from './get-task-by-id-controller.js'
import { listTasks } from './list-tasks-controller.js'
import { markTaskAsCompleted } from './mark-task-as-completed-controller.js'
import { registerTask } from './register-task-controller.js'
import { updateTask } from './update-task-controller.js'

export function tasksRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    registerTask,
  )
  app.post(
    '/:publicIdTask/assign',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    registerTaskUser,
  )
  app.get('/:publicIdTask', { onRequest: [verifyJwt] }, getTaskById)
  app.get('', { onRequest: [verifyJwt] }, listTasks)
  app.put(
    '/:publicIdTask',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    updateTask,
  )
  app.delete(
    '/:publicIdTask',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    deleteTask,
  )
  app.delete(
    '/:taskId/assign/:userId',
    { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
    deleteTaskUser,
  )
  app.patch(
    '/:publicIdTask/complete',
    { onRequest: [verifyJwt] },
    markTaskAsCompleted,
  )
}
