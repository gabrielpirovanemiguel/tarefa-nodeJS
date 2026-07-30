import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenters/users_presenter.js'
import z from 'zod'
import { makeGetUserById } from '@/use_cases/factories/users/make_get_by_id.js'
import { UserNotFound } from '@/use_cases/errors/user_not_found.js'

export async function getUserById(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const getUserByIdParamsSchema = z.object({ publicId: z.uuid() })
        const { publicId } = getUserByIdParamsSchema.parse(request.params)

        const getByIdUseCase = makeGetUserById()
        const { user } = await getByIdUseCase.execute({ publicId })

        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
