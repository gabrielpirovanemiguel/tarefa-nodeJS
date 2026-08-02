import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { UsersRepository } from '../users_repository.js'

export class PrismaUsersRepository implements UsersRepository {
    async createUser(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data })
    }

    async findUserByEmail(email: string) {
        return await prisma.user.findFirst({ where: { email } })
    }

    async listUsers() {
        return await prisma.user.findMany()
    }

    async getUserIdByPublicId(publicIdUser: string) {
        return await prisma.user.findUnique({where: { publicId: publicIdUser }, select: {id: true}})
    }

    async getUserByPublicId(publicIdUser: string) {
        return await prisma.user.findUnique({ where: { publicId: publicIdUser } })
    }

    async updateUser(publicIdUser: string, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: { publicId: publicIdUser },
            data,
        })
    }

    async deleteUser(publicIdUser: string) {
        await prisma.user.delete({ where: { publicId: publicIdUser } })
    }

    async findManyUsersByPublicIds(publicIdUsers: string[]) {
        return await prisma.user.findMany({
            where: { publicId: { in: publicIdUsers } }
        })
    }

}
