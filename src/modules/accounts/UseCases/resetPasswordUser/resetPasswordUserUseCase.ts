import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../infra/typeorm/Repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../infra/typeorm/Repositories/IUsersTokenRepository";



interface IRequest {
    password: string,
    token: string

}



@injectable()
class ResetPasswordUserUseCase {
    constructor(

        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private userRepository: IUsersRepository,


    ) { }
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);
        if (!userToken) {
            throw new Error('invalid token!');
        }

        if (this.dateProvider.compareIfBefore(userToken.expires_at, this.dateProvider.DateNow())) {
            throw new Error('token expired!');
        }
        const user = await this.userRepository.findById(userToken.user_id);


        user.password = await hash(password, 8);

        await this.userRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id)

    }
}

export { ResetPasswordUserUseCase };
