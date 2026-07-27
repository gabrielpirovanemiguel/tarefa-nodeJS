import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'


export class PrismaUsersRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({data})
    }
}