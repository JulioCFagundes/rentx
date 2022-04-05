import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}


@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationRepository
    ) {

    }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);
        const specifications = await this.specificationsRepository.findByIds(specifications_id)
        if (!carExists) {
            throw new AppError("Car doesn't exists!")
        }
        carExists.specifications = specifications; //Essa linha vai colocar as especificações nos carros, então as entradas são o id do carro e os id's das especificações. Nessa linha, eu to pegando as especificações que estão com o Id de entrada e colocando no carro :D

        await this.carsRepository.create(carExists); //aqui ta dando o update :D

        return carExists;

    }

}

export { CreateCarSpecificationUseCase }