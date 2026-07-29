import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { DeleteUserUseCase } from '@/use_cases/users/delete_user.js'

export function makeDeleteUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const delteUserUseCase = new DeleteUserUseCase(usersRepository)

    return delteUserUseCase
}
