import type { FastifyReply, FastifyRequest } from 'fastify'
import { USER_ROLE } from '@/@types/prisma/client.js'
import z from 'zod'
// import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { makeRegisterUserUseCase } from '@/use_cases/factories/make_register_user.js'
import { UserPresenter } from '@/http/presenters/users_presenter.js'
import { EmailAlreadyInUse } from '@/use_cases/errors/email_already_in_use.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerBodySchema = z.object({
            name: z.string().trim().min(1).max(100),
            email: z.email().trim().min(1).max(100),
            password: z.string().trim().min(8).max(100),
            role: z.enum(USER_ROLE).optional().default("user")
        })

        const { name, email, password, role } = registerBodySchema.parse(
            request.body,
        )

        const registerUseCase = makeRegisterUserUseCase()
        const { user } = await registerUseCase.execute({
            name,
            email,
            password,
            role
        })

        return reply.status(201).send({ user: UserPresenter.toHTTP(user) })
    } catch (error) {
        if (error instanceof EmailAlreadyInUse) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

}
