import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IRequest {
    name: string,
    description: string
}
/*
* [x] Definir o tipo de retorno 
* [x] Alterar o retorno de erro
* [x] Acessar o repositório
* [x] Retornar algo
 */
@injectable()
class CreateCategoryUseCase {
    
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){}

    

    async execute({name, description}: IRequest): Promise<void>{
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if(categoryAlreadyExists){
            throw new Error("Category already exists!")
        }
        console.log("antes de create")
        await this.categoriesRepository.create({name, description})

        }

}

export { CreateCategoryUseCase }