import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserNotFound } from '@/use_cases/errors/user_not_found.js'
import { makeDeleteUserUseCase } from '@/use_cases/factories/users/male_delete_user.js'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteUserParamsSchema = z.object({ publicId: z.uuid() })
        const { publicId } = deleteUserParamsSchema.parse(request.params)

        const deleteUserCase = makeDeleteUserUseCase()
        await deleteUserCase.execute({ publicId })

        return reply.status(204).send()
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
