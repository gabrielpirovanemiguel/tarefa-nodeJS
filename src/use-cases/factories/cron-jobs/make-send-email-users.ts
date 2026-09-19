import { SendEmailUsersUseCase } from "@/use-cases/cron-jobs/send-email-users.js";


export function makeSendEmailUsersUseCase() {
    return new SendEmailUsersUseCase()
}