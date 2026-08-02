import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users_repository.js'
import { UserNotFound } from '../errors/user_not_found.js'

interface getUserByIdRequestUseCase {
    publicIdUser: string
}

type getUserByIdResponseUseCase = {
    user: User
}

export class GetByIdUseCase {
    constructor(private userRepository: UsersRepository) {}
    async execute({
        publicIdUser,
    }: getUserByIdRequestUseCase): Promise<getUserByIdResponseUseCase> {
        try {
            const user = await this.userRepository.getUserByPublicId(publicIdUser)
            if (!user) throw new UserNotFound()
            return { user }
        } catch (error) {
            throw error
        }
    }
}
