import { Router } from 'express'
import { authenticateRoutes } from "./Authenticate.routes"
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { passwordRoutes } from './password.routes'
import { rentalRoutes } from './rental.routes'
import { specificationsRoutes } from './Specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes)
router.use(authenticateRoutes);
router.use("/password", passwordRoutes);

export { router }