import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification"
import { getRepository, Repository } from "typeorm";



class SpecificationsRepository implements ISpecificationRepository{

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
;
    


    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ 
            name, 
            description 
        });
        await this.repository.save(specification);
        return specification

    };

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    };

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids); //esse findByIds( ) que está sendo chamado, é do typerom. 
        return specifications;
    };
    

}

export { SpecificationsRepository }

