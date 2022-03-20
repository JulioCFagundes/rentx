import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../Repositories/Implementations/UsersRepository";
import { IUsersRepository } from "../../Repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}
@injectable()
class UpdateAvatarUseCase {
    constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) {
        
    }
    
    async execute({user_id, avatar_file}: IRequest): Promise<void> {
        //adicionar coluna avatar na table de users
        //refatorar o usuário com coluna avatar
            //configuração upload multer
            //Criar a regra de negócio do upload
            //Criar o controller
    const user = await this.usersRepository.findById(user_id);
    user.avatar = avatar_file;

        
    await this.usersRepository.create(user);
    }
}

export { UpdateAvatarUseCase }