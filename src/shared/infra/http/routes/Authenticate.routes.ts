import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/UseCases/AuthenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/UseCases/refreshToken/refreshTokenController";

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export { authenticateRoutes }