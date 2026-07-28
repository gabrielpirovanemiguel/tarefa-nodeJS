import type { Prisma, User } from '@/@types/prisma/client.js'


export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    list(): Promise<User[]>
    getUserById(publicId: string): Promise<User | null>
    updateUser(publicId: string, data: Prisma.UserUpdateInput): Promise<User>
    deleteUser(publicId: string): Promise<void>
}
