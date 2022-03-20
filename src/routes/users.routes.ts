import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticate";
import { CreateUserController } from "../modules/accounts/UseCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/UseCases/UpdateUserAvatar/UpdateUserAvatarController";


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController()

const updateUserAvatarController = new UpdateUserAvatarController()
usersRoutes.use(ensureAuthenticated)

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar",
ensureAuthenticated,
uploadAvatar.single("avatar"),
updateUserAvatarController.handle)
export {usersRoutes}