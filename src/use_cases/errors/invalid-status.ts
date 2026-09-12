import z from 'zod'
import { STATUS } from '@/@types/prisma/browser.js'

export const statusSchemaThrowError = z.enum(STATUS, {
  error: "Status inválido. Deve ser 'active', 'completed' ou 'cancelled'",
})
