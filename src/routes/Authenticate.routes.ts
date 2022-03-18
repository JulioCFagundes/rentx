import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/UseCases/AuthenticateUser/AuthenticateUserController";

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.get("/sessions",  authenticateUserController.handle)

export { authenticateRoutes }