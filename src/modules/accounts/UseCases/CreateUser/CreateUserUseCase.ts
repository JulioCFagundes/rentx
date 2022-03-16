import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../DTOS/ICreatUsersDTO";
import { IUsersRepository } from "../../Repositories/IUsersRepository";
import { hash } from "bcrypt";



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

        const passwordHash = await hash(password, 8) //passamos o valor que queremos incriptografar + o saltOrRouds que é um parametro para incriptografar.


        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new Error("This email is already in use")
        }


        await this.usersRepository.create({
            name, 
            
            email, 
            password: passwordHash, 
            driver_license
        })
    }

}


export {CreateUserUseCase}