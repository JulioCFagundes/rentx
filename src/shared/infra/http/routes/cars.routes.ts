import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/uploadCarImageController";
import { ensureAdmin } from "../midlewares/ensureAdmin";
import { ensureAuthenticated } from "../midlewares/EnsureAuthenticate";
import uploadConfig from "../../../../config/uploadCarImages";
const carsRoutes = Router();


const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImage = multer(uploadConfig);

carsRoutes.post("/",
ensureAuthenticated, 
ensureAdmin, 
createCarController.handle)

carsRoutes.get("/available", 
listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id",
ensureAuthenticated, 
ensureAdmin, 
createCarSpecificationController.handle)

carsRoutes.post("/images/:id",
ensureAuthenticated, 
ensureAdmin, 
uploadCarImage.array("images"),
uploadCarImageController.handle)
export { carsRoutes }