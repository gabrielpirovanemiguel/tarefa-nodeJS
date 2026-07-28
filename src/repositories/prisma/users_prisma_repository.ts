import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { UsersRepository } from '../users_repository.js'

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data })
    }

    async findByEmail(email: string) {
        return await prisma.user.findFirst({ where: { email } })
    }

    async list() {
        return await prisma.user.findMany()
    }

    async getUserById(publicId: string) {
        return await prisma.user.findUnique({ where: { publicId } })
    }
}
