import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { STATUS } from '@/@types/prisma/enums.js'
import { ProjectPresenter } from '@/http/presenters/projects-presenters.js'
import { statusSchemaThrowError } from '@/use_cases/errors/invalid-status.js'
import { makeRegisterProjectUseCase } from '@/use_cases/factories/projects/make-register-project.js'

const registerProjectBodySchema = z.object({
  name: z.string().min(1, { error: 'O projeto deve ter um nome.' }).max(50),
  description: z.string().max(200).optional(),
  status: statusSchemaThrowError.default(STATUS.active),
})

export async function registerProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, description, status } = registerProjectBodySchema.parse(
    request.body,
  )

  const registerProject = makeRegisterProjectUseCase()
  const { project } = await registerProject.execute({
    name,
    description,
    status,
  })
  reply.status(201).send(ProjectPresenter.toHTTP(project))
}
