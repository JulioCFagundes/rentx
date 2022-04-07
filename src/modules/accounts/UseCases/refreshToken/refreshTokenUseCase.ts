import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/dayjsDateProvider";
import { AppError } from "../../../../shared/errors/appError";

import { IUsersTokenRepository } from "../../infra/typeorm/Repositories/IUsersTokenRepository";

interface IPayLoad {
    sub: string;
    email: string;
}
@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: DayjsDateProvider

    ) { }




    async execute(token: string): Promise<string> {
        //a pessoa vai passar o refresh token como argumento


        const decode = verify(token, auth.secret_refresh_token) as IPayLoad
        const user_id = decode.sub
        const email = decode.email

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) {
            throw new AppError("Refresh Token Error does not exists!")
        }

        await this.usersTokenRepository.deleteById(userToken.id);


        const refresh_token = sign({ email, user_id }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)


        await this.usersTokenRepository.create({
            expires_at: refresh_token_expires_date,
            refresh_token,
            user_id,

        })

        return refresh_token;


    }
}

export { RefreshTokenUseCase }