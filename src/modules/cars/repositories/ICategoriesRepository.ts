import { CategoriesRepository } from "./implementations/CategoriesRepository";
import { Category } from "../entities/Category"

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name, description }: ICreateCategoryDTO): Promise<void>;
}
export {ICategoriesRepository, ICreateCategoryDTO }
