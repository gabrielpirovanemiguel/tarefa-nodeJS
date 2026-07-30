import type { UsersRepository } from '@/repositories/users_repository.js'
import { UserNotFound } from '../errors/user_not_found.js'

interface deleteUserRequest {
    publicId: string
}

export class DeleteUserUseCase {
    constructor(private userRepository: UsersRepository) {}
    async execute({ publicId }: deleteUserRequest): Promise<void> {
        try {
            const userToDelete = await this.userRepository.getUserByPublicId(publicId)
            if (!userToDelete) throw new UserNotFound()
            await this.userRepository.deleteUser(publicId)
        } catch (error) {
            throw error
        }
    }
}
