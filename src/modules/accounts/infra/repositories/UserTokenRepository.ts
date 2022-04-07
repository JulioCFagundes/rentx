
import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";

import { UserToken } from "../typeorm/entities/userToken";
import { IUsersTokenRepository } from "../typeorm/Repositories/IUsersTokenRepository";


interface IRequest {
    expires_at: Date;
    refresh_token: string;
    user_id: string;
}

@injectable()
class UsersTokenRepository implements IUsersTokenRepository {

    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }




    async create({ expires_at, refresh_token, user_id }: IRequest): Promise<UserToken> {
        const userToken = this.repository.create({ expires_at, refresh_token, user_id });
        await this.repository.save(userToken);

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userTokens = await this.repository.findOne({
            user_id,
            refresh_token
        });
        return userTokens;
    }

    async deleteById(user_id: string): Promise<void> {
        await this.repository.delete(user_id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        return await this.repository.findOne({ refresh_token });
    }


}


export { UsersTokenRepository }