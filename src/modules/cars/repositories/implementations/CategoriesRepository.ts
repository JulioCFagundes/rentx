import { Category} from "../../model/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


// DTO => data transfer object



class CategoriesRepository implements ICategoriesRepository{
    
    private categories: Category[];
    private static INSTANCE: CategoriesRepository

    private constructor() {
        this.categories = [];

    }

    public static getInstance(): CategoriesRepository {
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository()
        
        }
        return CategoriesRepository.INSTANCE
    }

    create( {description, name }: ICreateCategoryDTO): void {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        }) 
        
        
        this.categories.push(category)
    }
    list(): Category[] {
        return this.categories;
    }
    findByName(name: string): Category{
        const category = this.categories.find(category => category.name === name)
        return category
    }
}

export { CategoriesRepository }