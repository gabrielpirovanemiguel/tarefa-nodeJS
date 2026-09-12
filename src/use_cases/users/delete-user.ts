import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserNotFound } from '../errors/user-not-found.js'

interface deleteUserUseCaseRequest {
  publicIdUser: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute({ publicIdUser }: deleteUserUseCaseRequest): Promise<void> {
    const userToDelete =
      await this.userRepository.getUserByPublicId(publicIdUser)
    if (!userToDelete) throw new UserNotFound()
    await this.userRepository.deleteUser(publicIdUser)
  }
}
