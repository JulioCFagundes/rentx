import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/rentals";




class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental)
    }


    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({ car_id });
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({ user_id });
    }
    async create({
        car_id,
        user_id,
        expected_return_date,
        total,
        end_date,
        id,
    }: ICreateRentalDTO): Promise<Rental> {

        const rental = this.repository.create({
            car_id,

            user_id,
            expected_return_date,
            total,
            end_date,
            id,

        });
        this.repository.save(rental)
        return rental
    }
    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id)
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rental = await this.repository.find({
            where: { user_id },
            relations: ["car"]
        });

        return rental
    }
}

export { RentalsRepository }