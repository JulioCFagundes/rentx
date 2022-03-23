import { AppError } from "../../../../shared/errors/appError";
import { ICreateUserDTO } from "../../DTOS/ICreatUsersDTO";
import { UsersRepositoryInMemory } from "../../Repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    })
    it("Should be able to authenticate a user",  async()=> {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email: "judralisk@hotmail.com",
            password: "1234",
            name: "username test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email, 
            password: user.password,
        });
        expect(result).toHaveProperty("token");


    });

    it("should not be able to authenticate non existent user", () => {

        expect(async()=> {
            await authenticateUserUseCase.execute({
                email: "test@email.com", 
                password: "12345",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async()=> {

            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "test@email.com",
                password: "1234",
                name: "user test error"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            })
        }).rejects.toBeInstanceOf(AppError);
    })
});
