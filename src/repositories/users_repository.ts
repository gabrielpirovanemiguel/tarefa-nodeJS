import type { Prisma, User } from '@/@types/prisma/client.js'

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    //TODO: OUTRAS FUNÇÕES POSTERIORES
}
