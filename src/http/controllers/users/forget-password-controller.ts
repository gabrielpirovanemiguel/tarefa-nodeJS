import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { forgotPasswordHtmlTemplate } from '@/templates/forgot-password-html.js'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password-text.js'
import { UserNotFoundByToken } from '@/use_cases/errors/user-not-found-by-toker.js'
import { makeForgotPasswordUseCase } from '@/use_cases/factories/users/make-forget-password.js'
import { makeSendEmailUseCase } from '@/use_cases/factories/users/make-send-email.js'

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
