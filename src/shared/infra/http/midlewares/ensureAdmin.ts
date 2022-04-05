import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";
import { AppError } from "../../../errors/appError";




export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (user.isAdmin === false) {
        throw new AppError("User is not admin!")
    }
    return next();
}