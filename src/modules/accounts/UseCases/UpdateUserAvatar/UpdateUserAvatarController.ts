import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./updateUserAvatarUseCase";


class UpdateUserAvatarController  {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } =  request.user;
        const avatar_file = request.file.filename;
       //receber o arquivo

        const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase)
        console.log(request.file)
        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file })

        return response.status(204).send()
    }

}

export { UpdateUserAvatarController }