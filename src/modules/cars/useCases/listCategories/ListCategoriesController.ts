import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'





class ListCategoriesController {

    async handle(request: Request, response: Response): Promise<Response>{

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
        console.log(listCategoriesUseCase)
        const all = await listCategoriesUseCase.execute()
        console.log(all)
        
        
        return response.json(all)
    }
}

export {ListCategoriesController}