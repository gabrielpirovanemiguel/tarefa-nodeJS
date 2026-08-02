import type { USER_ROLE } from '@/@types/prisma/enums.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserIdOrRole(allowedRoles: USER_ROLE[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { publicIdResource } = request.params as { publicIdResource: string }
        const { sub: publicIdUserLogged, role } = request.user as {
            sub: string
            role: USER_ROLE
        }
        const isOwner = publicIdResource === publicIdUserLogged
        const hasAllowedRole = allowedRoles.includes(role)

        if (!isOwner && !hasAllowedRole) {
            return reply.status(403).send({
                message: 'Você não tem permissão para acessar esse recurso',
            })
        }
    }
}
