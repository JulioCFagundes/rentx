import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/dayjsDateProvider";
import { IMailProvider } from "../MailProvider/IMailProvider";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)
container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);