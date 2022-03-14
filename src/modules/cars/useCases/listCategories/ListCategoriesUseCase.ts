import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { Category } from "../../entities/Category"



class ListCategoriesUseCase {
    
    
    constructor(private categoriesRepository: ICategoriesRepository){ }

    execute(): Promise<Category[]> {
        const categories = this.categoriesRepository.list();

        return categories;

        }


}
export {ListCategoriesUseCase}