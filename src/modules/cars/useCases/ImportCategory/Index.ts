import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUsecase } from "./ImportCategoryUseCase";



const categoriesRepository = null;
const importCategoryUseCase = new ImportCategoryUsecase(categoriesRepository)
const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }