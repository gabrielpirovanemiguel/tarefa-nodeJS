import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeForgotPasswordUseCase } from '@/use-cases/factories/users/make-forget-password.js'
import z from 'zod'
import { makeSendEmailUseCase } from '@/use-cases/factories/users/make-send-email.js'
import { forgotPasswordTextTemplate } from '@/templates/reset-password/forgot-password-text.js'
import { forgotPasswordHtmlTemplate } from '@/templates/reset-password/forgot-password-html.js'
import { UserNotFoundByToken } from '@/use-cases/errors/user-not-found-by-toker.js'

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email } = z.object({ email: z.email() }).parse(request.body)

    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const { user, token } = await forgotPasswordUseCase.execute({ email })

    const sendEmailUseCase = makeSendEmailUseCase()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: 'Tentativa de recuperação de senha',
      message: forgotPasswordTextTemplate(user.name, token),
      html: forgotPasswordHtmlTemplate(user.name, token),
    })

    return reply.status(200).send({
      message:
        'Se o email existir, você receberá nele instruções para a recuperação.',
    })
  } catch (error) {
    if (error instanceof UserNotFoundByToken) {
      return reply.status(200).send({ message: error.message })
    }
    throw error
  }
}
