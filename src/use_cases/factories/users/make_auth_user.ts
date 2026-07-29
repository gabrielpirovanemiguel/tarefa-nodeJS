import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { AuthUserUseCase } from '@/use_cases/users/auth_users.js'

export function makeAuthUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const authUserUseCase = new AuthUserUseCase(usersRepository)

    return authUserUseCase
}
