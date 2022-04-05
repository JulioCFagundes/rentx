import { inject, injectable } from "tsyringe"
import { Rental } from "../../infra/typeorm/entities/rentals";
import { IRentalsRepository } from "../../repositories/IRentalsRepository"


interface IRequest {
    user_id: string;
}


@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute({ user_id }: IRequest): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;

    }
}

export { ListRentalsByUserUseCase }