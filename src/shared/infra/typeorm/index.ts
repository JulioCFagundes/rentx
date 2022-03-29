import { Connection, createConnection, getConnectionOptions } from "typeorm";


export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host:  process.env.NODE_ENV === "test" ? "localhost" : host ,
            database: process.env.NODE_ENV === 'test' ? "rentx_test" : defaultOptions.database, //essa linha diz o seguinte: se o meu ambiente for o de test, o app vai usar banco de dados, senão usa o default 

        })

    )
}
