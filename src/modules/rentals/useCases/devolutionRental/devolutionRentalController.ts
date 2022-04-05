import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUseCase } from './devolutionRentalUseCase';






class DevolutionRentalController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

        const rental = await devolutionRentalUseCase.execute({
            id


        });
        console.log(rental)
        return response.status(200).json(rental)

    }
}

export { DevolutionRentalController }