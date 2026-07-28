import { PrismaUsersRepository } from '@/repositories/prisma/users_prisma_repository.js'
import { GetByIdUseCase } from '../users/get_user_by_id.js'

export function makeGetUserById() {
    const userRepository = new PrismaUsersRepository()
    const getUserByIdUseCase = new GetByIdUseCase(userRepository)
    return getUserByIdUseCase
}
