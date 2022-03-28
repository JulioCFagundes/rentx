
import { inject, injectable } from "tsyringe"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../../repositories/ICarsRepository"


interface IRequest {
    category_id?: string,
    brand?: string,
    name?: string,
}
@injectable()
class ListAvailableCarsUseCase {
    
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
        ){}

    async execute({category_id, name, brand}: IRequest):Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            category_id, 
            name,
            brand, 
            )
        return cars
    }

}

export {ListAvailableCarsUseCase}