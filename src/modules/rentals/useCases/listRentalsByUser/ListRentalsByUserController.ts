
import { container } from 'tsyringe';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';
import { Request, Response } from 'express';




class ListRentalsByUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { id: user_id } = request.user;

        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);

        const rentals = await listRentalsByUserUseCase.execute(
            { user_id }
        );

        return response.json(rentals);

    }
}

export { ListRentalsByUserController }