import { verifyJwt } from "@/http/middlewares/verify_jwt.js";
import { verifyUserIdOrRole } from "@/http/middlewares/verify_user_id_or_role.js";
import type { FastifyInstance } from "fastify";
import { registerTask } from "./register_task_controller.js";


export function tasksRoutes(app: FastifyInstance) {
    app.post('/',{ onRequest: [verifyJwt, verifyUserIdOrRole(['admin'])] }, registerTask)
}