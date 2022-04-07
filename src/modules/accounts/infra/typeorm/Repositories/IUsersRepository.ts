import { ICreateUserDTO } from "../../../DTOS/ICreatUsersDTO"
import { User } from "../entities/user"


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}

export { IUsersRepository }