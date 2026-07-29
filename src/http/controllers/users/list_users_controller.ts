import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUsersUseCase } from '@/use_cases/factories/users/make_list_users.js'
import { UserPresenter } from '@/http/presenters/users_presenter.js'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const listUsers = makeListUsersUseCase()
        const { users } = await listUsers.execute()

        return reply.status(200).send({ users: UserPresenter.toHTTP(users) })
    } catch (error) {
        throw error
    }
}
