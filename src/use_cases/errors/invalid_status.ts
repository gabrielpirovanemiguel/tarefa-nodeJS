import { STATUS } from '@/@types/prisma/browser.js'
import z from 'zod'

export const statusSchemaThrowError = z.enum(STATUS, {
  error: "Status inválido. Deve ser 'active', 'completed' ou 'cancelled'",
})