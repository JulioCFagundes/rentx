import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"

import { Request, Response } from 'express'


class CreateSpecificationController {
    constructor(private CreateSpecificationUseCase: CreateSpecificationUseCase) {}
    handle(request: Request, response: Response) : Response {
    const {name, description} = request.body
    this.CreateSpecificationUseCase.execute({name, description})


    return response.status(201).send()

    
    }

}

export { CreateSpecificationController }