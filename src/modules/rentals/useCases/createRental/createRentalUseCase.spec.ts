import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/dayjsDateProvider";

import { AppError } from "../../../../shared/errors/appError";
import { RentalsRepositoryInMemory } from "../../repositories/InMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", ()=> {
    const dayAdd24hours = dayjs().utc().add(1, "day").toDate();
    const dayAdd23hours =  dayjs().utc().add(23, "hour").toDate();
    beforeEach(()=> {
        
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider;
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
    });

    it("Should be able to create a new Rental", async ()=> {
        const rental = await createRentalUseCase.execute({
            user_id: "1234", 
            car_id: "121212",
            expected_return_date: dayAdd24hours
        });
        console.log(rental)
        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });
    it("Should not be able to create a new Rental when there's already one rental open for the same user", async ()=> {
        
       expect(async ()=> {
        const rental = await createRentalUseCase.execute({
            user_id: "1234", 
            car_id: "121212",
            expected_return_date: dayAdd24hours
        });
        const rental2 = await createRentalUseCase.execute({
            user_id: "1234", 
            car_id: "12",
            expected_return_date:  dayAdd24hours
        });
       }).rejects.toBeInstanceOf(AppError);
    });
    it("Should not be able to create a new Rental when there's already one rental open for the same car", async ()=> {
        
        expect(async ()=> {
         const rental = await createRentalUseCase.execute({
             user_id: "1234", 
             car_id: "121212",
             expected_return_date: dayAdd24hours
         });
         const rental2 = await createRentalUseCase.execute({
             user_id: "123", 
             car_id: "121212",
             expected_return_date: dayAdd24hours
         });
        }).rejects.toBeInstanceOf(AppError);
     });
    it("Should not be able to create a new Rental with invalid return time", async ()=> {
        
        expect(async ()=> {
         const rental = await createRentalUseCase.execute({
             user_id: "1234", 
             car_id: "121212",
             expected_return_date: dayAdd23hours
         });
         
        }).rejects.toBeInstanceOf(AppError);
     });
});