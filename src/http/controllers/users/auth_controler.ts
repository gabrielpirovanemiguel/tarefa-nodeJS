import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthUserUseCase } from '@/use_cases/factories/make_auth_user.js'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use_cases/errors/invalid_credentials_error.js'
import { UserPresenter } from '@/http/presenters/users_presenter.js'

const authenticateSchema = z.object({
    email: z.email().trim().min(1),
    password: z.string().min(1)
})

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { email, password } = authenticateSchema.parse(request.body)

        const authUserUseCase = makeAuthUserUseCase()
        const { user } = await authUserUseCase.execute({ email, password })

        const token = await reply.jwtSign(
            { sub: user.publicId, role: user.role },
            { expiresIn: '1d' }
        )

        return reply.status(200).send({ token, user: UserPresenter.toHTTP(user) })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }
}


