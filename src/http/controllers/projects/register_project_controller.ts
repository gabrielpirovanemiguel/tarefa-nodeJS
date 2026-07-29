import { STATUS } from "@/@types/prisma/enums.js";
import { ProjectPresenter } from "@/http/presenters/projects_presenters.js";
import { makeRegisterProjectUseCase } from "@/use_cases/factories/projects/make_register_project.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const registerProjectBodySchema =z.object({
    name: z.string().min(1, {error: "O projeto deve ter um nome."}).max(50),
    description: z.string().max(200).optional(),
    status: z.enum(STATUS, {error: "O status do projeto é inválido."}).default(STATUS.active)
})

export async function registerProject(
    request: FastifyRequest,
    reply: FastifyReply) {
        try {
            const { name, description, status } = registerProjectBodySchema.parse(request.body)

            const registerProjectUseCase = makeRegisterProjectUseCase()
            const { project } = await registerProjectUseCase.execute({
                name,
                description,
                status
            })
            reply.status(201).send({project: ProjectPresenter.toHTTP(project)})
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send(z.treeifyError(error))
            }
            throw error
        }
}