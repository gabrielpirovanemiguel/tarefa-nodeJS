import { verifyJwt } from "@/http/middlewares/verify_jwt.js";
import { verifyUserIdOrRole } from "@/http/middlewares/verify_user_id_or_role.js";
import type { FastifyInstance } from "fastify";
import { registerTask } from "./register_task_controller.js";
import { getTaskById } from "./get_task_by_id_controller.js";
import { listTasks } from "./list_tasks_controller.js";


export function tasksRoutes(app: FastifyInstance) {
    app.post('/',{ onRequest: [verifyJwt, verifyUserIdOrRole(['admin'])] }, registerTask)
    app.get('/:publicId', { onRequest: [verifyJwt]}, getTaskById)
    app.get('/', { onRequest: [verifyJwt]}, listTasks)
}