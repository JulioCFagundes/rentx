import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../midlewares/EnsureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();


rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle)


export { rentalRoutes };