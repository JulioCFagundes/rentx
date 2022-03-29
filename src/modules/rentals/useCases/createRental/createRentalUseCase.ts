import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/appError";
import { Rental } from "../../infra/typeorm/entities/rentals";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";


dayjs.extend(utc);
interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ){};



    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rental> {
        const minimumOfHours = 24;
        const carIsUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carIsUnavailable){
            throw new AppError("Car is unavailable!");
        };

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("This user already has a rental in progress!");
        };

        const dateNow = this.dateProvider.DateNow();

        const compare = this.dateProvider.compareInHours( dateNow ,expected_return_date);

        if( compare < minimumOfHours ) {
            throw new AppError("Invalid return time!");
        };

        const rental = this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;

    };
};

export {CreateRentalUseCase};