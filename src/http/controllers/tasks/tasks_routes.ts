import { verifyJwt } from "@/http/middlewares/verify_jwt.js";
import type { FastifyInstance } from "fastify";
import { registerTask } from "./register_task_controller.js";
import { getTaskById } from "./get_task_by_id_controller.js";
import { listTasks } from "./list_tasks_controller.js";
import { updateTask } from "./update_task_controller.js";
import { USER_ROLE } from "@/@types/prisma/enums.js";
import { deleteTask } from "./delete_task_controller.js";
import { verifyUserIdOrRole } from "@/http/middlewares/verify_user_id_or_role.js";
import { markTaskAsCompleted } from "./mark_task_as_completed_controller.js";


export function tasksRoutes(app: FastifyInstance) {
    app.post('/',{ onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, registerTask)
    app.get('/:publicId', { onRequest: [verifyJwt]}, getTaskById)
    app.get('', { onRequest: [verifyJwt]}, listTasks)
    app.put('/:publicId', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, updateTask)
    app.delete('/:publicId', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, deleteTask)
    app.patch('/:publicId/complete', {onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, markTaskAsCompleted)
}