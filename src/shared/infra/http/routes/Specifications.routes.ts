 import {Router} from 'express';
 import { ensureAuthenticated } from '../EnsureAuthenticate';
 import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';


 const createSpecificationController = new CreateSpecificationController()

 const specificationsRoutes = Router();


 
 specificationsRoutes.use(ensureAuthenticated)
 specificationsRoutes.post("/", createSpecificationController.handle)

 export { specificationsRoutes}