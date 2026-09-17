import { env } from '../env/index.js'
import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
})

interface SendEmailRequest {
  to: string
  subject: string
  message: string
  text?: string
  html?: string
  attachments?: Mail.Attachment[]
}

export async function sendEmail({
  to,
  subject,
  message,
  html,
  attachments,
}: SendEmailRequest) {
  try {
    const info = await transporter.sendMail({
      from: env.SMTP_EMAIL,
      to,
      subject,
      text: message,
      html,
      ...(attachments ? { attachments } : {}),
    })
    return info
  } catch (error) {
    throw error
  }
}
