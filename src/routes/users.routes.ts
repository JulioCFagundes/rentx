import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticate";
import { CreateUserController } from "../modules/accounts/UseCases/CreateUser/CreateUserController";

const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.use(ensureAuthenticated)

usersRoutes.post("/", createUserController.handle)

export {usersRoutes}