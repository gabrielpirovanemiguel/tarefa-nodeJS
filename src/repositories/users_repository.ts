import type { Prisma, User } from '@/@types/prisma/client.js'

export interface UsersRepository {
    createUser(data: Prisma.UserCreateInput): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
    listUsers(): Promise<User[]>
    getUserByPublicId(publicIdUser: string): Promise<User | null>
    getUserIdByPublicId(publicIdUser: string): Promise<{ id: number } | null>
    updateUser(publicIdUser: string, data: Prisma.UserUpdateInput): Promise<User>
    deleteUser(publicIdUser: string): Promise<void>
    findManyUsersByPublicIds(publicIdUsers: string[]): Promise<User[]>
}
