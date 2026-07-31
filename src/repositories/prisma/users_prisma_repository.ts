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

    async getUserIdByPublicId(publicId: string) {
        return await prisma.user.findUnique({where: { publicId }, select: {id: true}})
    }

    async getUserByPublicId(publicId: string) {
        return await prisma.user.findUnique({ where: { publicId } })
    }

    async updateUser(publicId: string, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: { publicId },
            data,
        })
    }

    async deleteUser(publicId: string) {
        await prisma.user.delete({ where: { publicId } })
    }

    async findManyUsersByPublicIds(publicIds: string[]) {
        return await prisma.user.findMany({
            where: { publicId: { in: publicIds } }
        })
    }

}
