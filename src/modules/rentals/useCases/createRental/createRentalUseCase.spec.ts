import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/dayjsDateProvider";

import { AppError } from "../../../../shared/errors/appError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/InMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().utc().add(1, "day").toDate();
    const dayAdd23hours = dayjs().utc().add(23, "hour").toDate();
    beforeEach(() => {

        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);

    });

    it("Should be able to create a new Rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Ford Fusca",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            category_id: "1",
            brand: "Ford",
            id: "1",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24hours
        });
        console.log(rental)
        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });
    it("Should not be able to create a new Rental when there's already one rental open for the same user", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Ford Fusca",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            category_id: "1",
            brand: "Ford",
            id: "1"
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Fusca2",
            description: "Ford Fusca2",
            daily_rate: 100,
            license_plate: "FFF-4321",
            fine_amount: 15,
            category_id: "3",
            brand: "Ford2",
            id: "2"
        });


        await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24hours
        });
        console.log(car.id)
        console.log(car2.id)
        await expect(

            createRentalUseCase.execute({
                user_id: "1234",
                car_id: car2.id,
                expected_return_date: dayAdd24hours
            })

        ).rejects.toEqual(new AppError("This user already has a rental in progress!"));
    });
    it("Should not be able to create a new Rental when there's already one rental open for the same car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Ford Fusca",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            category_id: "1",
            brand: "Ford",
            id: "1",
        });
        await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24hours
        });
        await expect(

            createRentalUseCase.execute({
                user_id: "123",
                car_id: car.id,
                expected_return_date: dayAdd24hours
            })
        ).rejects.toEqual(new AppError("Car is unavailable!"));
    });
    it("Should not be able to create a new Rental with invalid return time", async () => {

        await expect(
            createRentalUseCase.execute({
                user_id: "1234",
                car_id: "121212",
                expected_return_date: dayAdd23hours
            })

        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
});