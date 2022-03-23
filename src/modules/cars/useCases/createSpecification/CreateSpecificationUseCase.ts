import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
    name:string;
    description:string;


}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationRepository
        ){}

    async execute({name, description}: IRequest):Promise<void>{
        
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if(specificationAlreadyExists){
            throw new AppError("Specification already exists!", 401)
        }


        await this.specificationsRepository.create({
            name,
            description
            })
    

       

    }
}
export {CreateSpecificationUseCase}