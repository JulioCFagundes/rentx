import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/appError";
import { IUsersRepository } from "../../infra/typeorm/Repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../infra/typeorm/Repositories/IUsersTokenRepository";
import { v4 as uuidV4 } from "uuid";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";







@injectable()
class SendForgottenPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("UserTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
    ) { }






    async execute(email: string) {

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotpassword.hbs");



        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError(
                "User does not exists!",
            )
        }

        const token = uuidV4();
        const expires_at = this.dateProvider.addHours(3);

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_at,
        })
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        }

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath,


        )
    }

}

export { SendForgottenPasswordMailUseCase }