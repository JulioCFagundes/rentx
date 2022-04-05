import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/appError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/rentals";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



interface IRequest {

    id: string;

}


@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id }: IRequest): Promise<Rental> {
        const rental = await this.rentalRepository.findById(id);
        const minimum_daily = 1;



        if (!rental) {
            throw new AppError("Rental doesn't exists")
        }
        const car = await this.carsRepository.findById(rental.car_id);
        // verificando o tempo de aluguel


        const dateNow = this.dateProvider.DateNow();



        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);
        let daily = this.dateProvider.compareInDays(dateNow, rental.created_at);
        let total = 0;
        if (daily <= 0) {
            daily = minimum_daily;
        }

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental
    }

}

export { DevolutionRentalUseCase };