import { AppError } from "../../../../shared/errors/appError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });



    it("should not be able to add a new specification into a non-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];
        await expect(

            createCarSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError("Car doesn't exists!"));
    });


    it("should be able to add a new specification into a car", async () => {

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test",
        })
        const specifications_id = [specification.id]

        const car1 = await carsRepositoryInMemory.create({
            name: " Carro 1",
            description: "Este é algum Carro ",
            daily_rate: 60,
            license_plate: " ABC-1234 ",
            fine_amount: 100,
            brand: "Audi",
            category_id: "category id",
            id: "1",
        });

        const specifications_cars = await createCarSpecificationUseCase.execute({ car_id: car1.id, specifications_id });

        console.log(specifications_cars)

        expect(specifications_cars).toHaveProperty("specifications");
        expect(specifications_cars.specifications.length).toBe(1)
    });



})