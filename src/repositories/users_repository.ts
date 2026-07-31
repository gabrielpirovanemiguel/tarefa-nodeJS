import type { Prisma, User } from '@/@types/prisma/client.js'

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    list(): Promise<User[]>
    getUserByPublicId(publicId: string): Promise<User | null>
    getUserIdByPublicId(publicId: string): Promise<{ id: number } | null>
    updateUser(publicId: string, data: Prisma.UserUpdateInput): Promise<User>
    deleteUser(publicId: string): Promise<void>
    findManyUsersByIds(ids: number[]): Promise<User[]>
}
