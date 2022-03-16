import { ICreateUserDTO } from "../DTOS/ICreatUsersDTO"


interface IUsersRepository{
    create(data: ICreateUserDTO): Promise<void>
}

export { IUsersRepository }