import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { IUsersRepository } from "../../Repositories/IUsersRepository"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../shared/errors/appError"


interface IRequest{
    email: string,
    password: string 
}

interface IResponse{
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository

    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        //usuário existe
        const user = await this.usersRepository.findByEmail(email)
        if(!user){
            throw new AppError("Email or password incorrect")
        }
    
        //senha está correta
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch){
            throw new AppError("Email or password incorrect")
        }

        //gerar jsonwebtoken

        const token = sign(
            {},
             "a2d10a3211b415832791a6bc6031f9ab", //para pegar o segundo parâmetro, podemos dar um google por gerador md5
            {
            subject: user.id,
            expiresIn: "1d" //token expira em um dia,
            });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }
        return tokenReturn

    }
}

export { AuthenticateUserUseCase }