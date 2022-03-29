import { container  } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/dayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)
