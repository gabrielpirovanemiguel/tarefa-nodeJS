import { verifyJwt } from "@/http/middlewares/verify_jwt.js";
import type { FastifyInstance } from "fastify";
import { registerProject } from "./register_project_controller.js";
import { verifyUserIdOrRole } from "@/http/middlewares/verify_user_id_or_role.js";
import { USER_ROLE } from "@/@types/prisma/enums.js";

export function projectsRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] }, registerProject)
}