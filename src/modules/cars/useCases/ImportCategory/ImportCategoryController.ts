import { ImportCategoryUsecase } from "./ImportCategoryUseCase";
import { Request, Response } from 'express'
class ImportCategoryController {

    constructor(private importCategoryUseCase: ImportCategoryUsecase) {}
    handle(request: Request, response: Response): Response {
    const { file } = request;
    
    this.importCategoryUseCase.execute(file)

    
    return response.send() 
    }
}

export { ImportCategoryController }