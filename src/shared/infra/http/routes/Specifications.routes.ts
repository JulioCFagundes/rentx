 import {Router} from 'express';
 import { ensureAuthenticated } from '../midlewares/EnsureAuthenticate';
 import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { authenticateRoutes } from './Authenticate.routes';
import { ensureAdmin } from '../midlewares/ensureAdmin';


 const createSpecificationController = new CreateSpecificationController()

 const specificationsRoutes = Router();


 
 specificationsRoutes.use(ensureAuthenticated)
 specificationsRoutes.post("/",
 ensureAuthenticated,
 ensureAdmin, 
 createSpecificationController.handle)

 export { specificationsRoutes}