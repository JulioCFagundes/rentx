import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";




class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>; //typeorm define o nosso repositório sendo do tipo Car e privado; 
    constructor() {
        this.repository = getRepository(Car) //typeorm criou o nosso repositório a partir da entidade Car;
    }



    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        id,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            id,
            specifications,
        });

        await this.repository.save(car)

        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        });
        return car
    }
    async findAvailable(
        category_id?: string,
        name?: string,
        brand?: string,

    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }
        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }
        const cars = await carsQuery.getMany();

        return cars;
    }
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
        //fiz uma query, chamei update (tudo vem do typeorm, tem documentação), set é onde eu vou mudar, onde o id é igual ao parametro id, setou o parametro id e executou
        // em SQL esse comando corresponde a - UPDATE cars SET available = 'true' WHERE id = :id

    }

}

export { CarsRepository }