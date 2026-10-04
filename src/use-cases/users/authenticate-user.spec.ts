import { describe, expect, it, vi } from 'vitest'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { AuthUserUseCase } from './auth-users.js'

describe('AuthUserUseCase', () => {
  it('deve retornar um token quando o email e a senha estiverem corretos', async () => {
    // Arrange
    const fakeUser = {
      id: 1,
      publicId: '01a10907-0194-7652-9533-1c6214b2779c',
      name: 'João',
      email: 'joao@email.com',
      passwordHash: 'senha-hasheada-no-banco',
      token: null,
      tokenExpiresAt: null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const usersRepository = { findUserByEmail: vi.fn().mockResolvedValue(fakeUser) }
    const hashProvider = { compare: vi.fn().mockResolvedValue(true) }
    const tokenProvider = { sign: vi.fn().mockResolvedValue('token-falso-123') }
    const sut = new AuthUserUseCase(
      usersRepository as unknown as UsersRepository,
      hashProvider,
      tokenProvider,
    )

    // Act
    const result = await sut.execute({ email: 'joao@email.com', password: '123456' })

    // Assert
    expect(result.token).toBe('token-falso-123')
    expect(usersRepository.findUserByEmail).toHaveBeenCalledWith('joao@email.com')
    expect(hashProvider.compare).toHaveBeenCalledWith('123456', 'senha-hasheada-no-banco')
  })
})