import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserNotFound } from '../errors/user-not-found.js'

export interface UpdateUserUseCaseRequest {
  publicIdUser: string
  name?: string
  password?: string
}

type UpdateUserUseCaseResponse = {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    publicIdUser,
    name,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate =
      await this.usersRepository.getUserByPublicId(publicIdUser)
    if (!userToUpdate) throw new UserNotFound()

    let passwordHash: string | undefined
    if (password) passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.updateUser(userToUpdate.publicId, {
      name,
      passwordHash,
    })

    return { user }
  }
}
