import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { IUsersRepository } from "../../infra/typeorm/Repositories/IUsersRepository"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../shared/errors/appError"
import auth from "../../../../config/auth"
import { IUsersTokenRepository } from "../../infra/typeorm/Repositories/IUsersTokenRepository"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"


interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string,
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokenRepository")
        private userTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }






    async execute({ email, password }: IRequest): Promise<IResponse> {
        //usuário existe
        const user = await this.usersRepository.findByEmail(email)
        const { expires_in_token, expires_in_refresh_token, secret_refresh_token, secret_token, expires_refresh_token_days } = auth



        if (!user) {
            throw new AppError("Email or password incorrect")
        }

        //senha está correta
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect")
        }

        //gerar jsonwebtoken

        const token = sign(
            {},
            secret_token, //para pegar o segundo parâmetro, podemos dar um google por gerador md5
            {
                subject: user.id,
                expiresIn: expires_in_token //token expira em um dia,
            });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        await this.userTokenRepository.create({
            user_id: user.id,
            refresh_token,
            expires_at: refresh_token_expires_date,
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }
        return tokenReturn

    }
}

export { AuthenticateUserUseCase }