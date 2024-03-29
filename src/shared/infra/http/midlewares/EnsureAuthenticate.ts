import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../../../errors/appError";
import { UsersTokenRepository } from "../../../../modules/accounts/infra/repositories/UserTokenRepository";
import auth from "../../../../config/auth";

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    const userTokenRepository = new UsersTokenRepository()

    if (!authHeader) {
        throw new AppError("missing token", 401)
    }

    const [, token] = authHeader.split(" ")


    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload


        const user = userTokenRepository.findByUserIdAndRefreshToken(user_id, token)

        if (!user) {
            throw new AppError("user doesn't exists", 401)

        }
        request.user = { id: user_id }
        next();

    } catch {
        throw new AppError("invalid token!", 401)
    }

}