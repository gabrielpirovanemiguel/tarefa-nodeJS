import { PrismaUsersRepository } from "@/repositories/prisma/users_prisma_repository.js"
import { ListUsersUseCase } from "../users/list_users.js"


export function makeListUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const listUsersUseCase = new ListUsersUseCase(usersRepository)
  return listUsersUseCase
}