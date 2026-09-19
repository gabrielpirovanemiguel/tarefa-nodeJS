import { topPostsTextTemplate } from "@/templates/top-posts/top-posts-text.js";
import { topPostsHtmlTemplate } from "@/templates/top-posts/top-posts-html.js";
import { makeGetUsersTopPostsLast24 } from "../factories/posts/make-get-users-top-posts-last24.js";
import { makeSendEmailUseCase } from "../factories/users/make-send-email.js";


export class SendEmailUsersUseCase {
    async execute() {
        const sendEmailUseCase = makeSendEmailUseCase()
        const getUsersTopPostsLast24UseCase = makeGetUsersTopPostsLast24()
        const { users } = await getUsersTopPostsLast24UseCase.execute()
        try {
            for (const user of users) {
                await sendEmailUseCase.execute({
                    to: user.email,
                    subject: "Resumo dos destaques",
                    message: topPostsTextTemplate(user.name),
                    html: topPostsHtmlTemplate(user.name)
            })
        }} catch (error) {
            throw error
        }
    }
}
