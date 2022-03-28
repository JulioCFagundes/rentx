import { categoriesRoutes } from "../../../../shared/infra/http/routes/categories.routes";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryinMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(()=> {
        carsRepositoryinMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryinMemory);
    });

    it("Should be able to list all available cars", async ()=> {

         const car1 = await carsRepositoryinMemory.create({
            "name": " Carro 1",
            "description": "Este é algum Carro ",
            "daily_rate": 60,
            "license_plate": " ABC-1234 ",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "category id"
        });
         const car2 = await carsRepositoryinMemory.create({
            "name": " Carro 2",
            "description": "descrição de Este é um Carro ",
            "daily_rate": 60,
            "license_plate": " EFG-5555 ",
            "fine_amount": 100,
            "brand": "Alguma marca de carro",
            "category_id": "category id"
        })

        
         const cars =  await listAvailableCarsUseCase.execute({});
         expect(cars).toEqual([car1,car2])
    });
    it("Should be able to list all available cars with same brand", async ()=> {
        
         const car3 = await carsRepositoryinMemory.create({
            "name": " Carro 3",
            "description": "Este é algum Carro ",
            "daily_rate": 60,
            "license_plate": " ABC-1234 ",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "category id"
        });
         

         
         const cars =  await listAvailableCarsUseCase.execute(
             {brand: "Alguma marca de carro"}
         );
         
         expect(cars).toEqual([car3])
    });
    it("Should be able to list all available cars with same name", async ()=> {
        
         const car4 = await carsRepositoryinMemory.create({
            "name": "Carro 3",
            "description": "Este é algum Carro ",
            "daily_rate": 60,
            "license_plate": " ABC-1234 ",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "category id"
        });
         

         
         const cars =  await listAvailableCarsUseCase.execute(
             {name: "Carro 3"}
         );
         
         expect(cars).toEqual([car4])
    });
    it("Should be able to list all available cars with same category", async ()=> {
        
         const car5 = await carsRepositoryinMemory.create({
            "name": "Carro 3",
            "description": "Este é algum Carro ",
            "daily_rate": 60,
            "license_plate": " ABC-1234 ",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "12345"
        });
         

         
         const cars =  await listAvailableCarsUseCase.execute(
             {category_id: "1234"}
         );
         
         expect(cars).toEqual([car5])
    });
});