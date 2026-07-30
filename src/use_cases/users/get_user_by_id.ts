import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users_repository.js'
import { UserNotFound } from '../errors/user_not_found.js'

interface getUserByIdRequest {
    publicId: string
}

type getUserByIdResponse = {
    user: User
}

export class GetByIdUseCase {
    constructor(private userRepository: UsersRepository) {}
    async execute({
        publicId,
    }: getUserByIdRequest): Promise<getUserByIdResponse> {
        try {
            const user = await this.userRepository.getUserByPublicId(publicId)
            if (!user) throw new UserNotFound()
            return { user }
        } catch (error) {
            throw error
        }
    }
}
