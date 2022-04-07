import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from './resetPasswordUserUseCase';







class ResetPasswordUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const password = request.body.password;
        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)
        resetPasswordUserUseCase.execute({ token: String(token), password })
        return response.send();
    }
}

export { ResetPasswordUserController }