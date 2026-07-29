import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { UpdateUserUseCase } from '@/use_cases/users/update_user.js'

export function makeUpdateUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const updateUseCase = new UpdateUserUseCase(usersRepository)

    return updateUseCase
}
