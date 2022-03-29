import { ICreateCarDTO } from "../../cars/dtos/ICreateCarDTO";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/rentals";



interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}

export {IRentalsRepository}