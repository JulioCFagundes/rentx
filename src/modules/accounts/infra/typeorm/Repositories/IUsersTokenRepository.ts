
import { ICreateUserTokenDTO } from "../../../DTOS/ICreateUserTokenDTO"
import { UserToken } from "../entities/userToken"






interface IUsersTokenRepository {

    create({ expires_at, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;

}







export { IUsersTokenRepository }