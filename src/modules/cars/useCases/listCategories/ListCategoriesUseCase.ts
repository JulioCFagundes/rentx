import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { Category } from "../../entities/Category"
import { inject, injectable } from 'tsyringe';


@injectable()
class ListCategoriesUseCase {
    
    
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){ }

    async execute(): Promise<Category[]> {
        console.log("chegou aqui")
        const categories = await this.categoriesRepository.list();
        console.log("depois de const categories")
        return categories;

        }


}
export {ListCategoriesUseCase}