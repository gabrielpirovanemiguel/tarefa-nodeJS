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
import { registerTaskUser } from "../task_user/register_task_user_controller.js";
import { deleteTaskUser } from "../task_user/delete_task_user_controller.js";


export function tasksRoutes(app: FastifyInstance) {
    app.post('/',{ onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, registerTask)
    app.post('/:publicIdTask/assign', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, registerTaskUser)
    app.get('/:publicIdTask', { onRequest: [verifyJwt]}, getTaskById)
    app.get('', { onRequest: [verifyJwt]}, listTasks)
    app.put('/:publicIdTask', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, updateTask)
    app.delete('/:publicIdTask', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, deleteTask)
    app.delete('/:taskId/assign/:userId', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])]}, deleteTaskUser)
    app.patch('/:publicIdTask/complete', {onRequest: [verifyJwt]}, markTaskAsCompleted)
}