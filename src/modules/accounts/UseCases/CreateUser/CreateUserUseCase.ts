import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../DTOS/ICreatUsersDTO";
import { IUsersRepository } from "../../Repositories/IUsersRepository";




@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}


    async execute({name, 
        
        email, 
        password, 
        driver_license
    }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name, 
            
            email, 
            password, 
            driver_license})
    }

}


export {CreateUserUseCase}