import { Router } from "express";
import { ResetPasswordUserController } from "../../../../modules/accounts/UseCases/resetPasswordUser/resetPasswordUserController";
import { SendForgottenPasswordMailController } from "../../../../modules/accounts/UseCases/SendForgottenPasswordMail/SendForgottenPasswordMailController";

const passwordRoutes = Router();
const sendForgottenPasswordMailController = new SendForgottenPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();



passwordRoutes.post("/forgot", sendForgottenPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);


export { passwordRoutes };