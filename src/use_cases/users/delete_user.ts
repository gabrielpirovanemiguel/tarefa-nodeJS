import type { UsersRepository } from '@/repositories/users_repository.js'
import { UserNotFound } from '../errors/user_not_found.js'

interface deleteUserUseCaseRequest {
    publicIdUser: string
}

export class DeleteUserUseCase {
    constructor(private userRepository: UsersRepository) {}
    async execute({ publicIdUser }: deleteUserUseCaseRequest): Promise<void> {
        try {
            const userToDelete = await this.userRepository.getUserByPublicId(publicIdUser)
            if (!userToDelete) throw new UserNotFound()
            await this.userRepository.deleteUser(publicIdUser)
        } catch (error) {
            throw error
        }
    }
}
