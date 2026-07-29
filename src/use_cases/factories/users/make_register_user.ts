import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { RegisterUserUseCase } from '@/use_cases/users/register_user.js'

export function makeRegisterUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    return registerUseCase
}
