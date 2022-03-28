import { AppError } from "../../../../shared/errors/appError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        
    })
    it("Car should have an id", async ( ) => {
        
        const car = await createCarUseCase.execute({        
            name: "Car's name",
            description: "car's description", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        })
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car that license plate already exists", async ( ) =>{
        expect(async()=> {
            await createCarUseCase.execute({        
                name: "Car's name 1",
                description: "car's description 1", 
                daily_rate: 101, 
                license_plate: "ABC-1234", 
                fine_amount: 61, 
                brand: "Brand1", 
                category_id: "category1"
            });
    
            await createCarUseCase.execute({        
                name: "Car's name 2",
                description: "car's description 2", 
                daily_rate: 102, 
                license_plate: "ABC-1234", 
                fine_amount: 62, 
                brand: "Brand2", 
                category_id: "category2"
            });

        }).rejects.toBeInstanceOf(AppError)


    });
    it("should be able to create a car with available true by default", async ( ) =>{
        const car =  await createCarUseCase.execute({        
            name: "Car Available",
            description: "car's description", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        });
    expect(car.available).toBe(true);
    })
});