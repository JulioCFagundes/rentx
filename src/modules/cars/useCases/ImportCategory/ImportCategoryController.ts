import { ImportCategoryUsecase } from "./ImportCategoryUseCase";
import { Request, Response } from 'express'
import { container } from "tsyringe";
class ImportCategoryController {

    
    handle(request: Request, response: Response): Response {
    const { file } = request;
    
    const importCategoryUseCase = container.resolve(ImportCategoryUsecase);

    importCategoryUseCase.execute(file);

    
    return response.send();
    }
}

export { ImportCategoryController }