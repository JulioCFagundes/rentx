import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/infra/typeorm/Repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarImagesRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/rentalsRepository";
import "./providers/DateProvider/index"
import { IUsersTokenRepository } from "../../modules/accounts/infra/typeorm/Repositories/IUsersTokenRepository";
import { UsersTokenRepository } from "../../modules/accounts/infra/repositories/UserTokenRepository";


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

container.registerSingleton<IUsersTokenRepository>(
    "UserTokenRepository",
    UsersTokenRepository
)



