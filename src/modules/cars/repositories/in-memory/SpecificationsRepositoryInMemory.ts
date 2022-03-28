import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";




class SpecificationsRepositoryInMemory implements ISpecificationRepository {

    specifications: Specification[] = [];

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            description,
            name
        });
        this.specifications.push(specification);
        return specification
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find((specification)=> specification.name === name)
        return specification;
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification)=> ids.includes(specification.id)) //pega todos os ids que estão inclusos em specification.id :D
        return allSpecifications
    }



}
export {SpecificationsRepositoryInMemory}