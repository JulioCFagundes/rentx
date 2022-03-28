import { Router } from 'express';


import{ CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import multer from "multer"
import { ImportCategoryController } from '../../../../modules/cars/useCases/ImportCategory/ImportCategoryController';
import { ensureAuthenticated } from '../midlewares/EnsureAuthenticate';
import { ensureAdmin } from '../midlewares/ensureAdmin';

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthenticated)
categoriesRoutes.post("/", 
ensureAuthenticated,
ensureAdmin,
createCategoryController.handle);

categoriesRoutes.get("/",  listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export {categoriesRoutes};