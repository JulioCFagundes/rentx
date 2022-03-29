import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";
import {v4 as uuidV4} from "uuid";

let connection: Connection;
describe("Create Category controller", () => {

    beforeAll(async()=> {
        //antes de cada teste, criar um usuário administrador

        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4()
        const password = await hash("admin", 8);

        await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'Admin', 'admin@admin.com', '${password}', true , 'now()', 'XXXXXXX' )`
        );
    });

    afterAll(async()=> {

        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category",async () => {

        const responseToken = await request(app).get("/sessions")
        .send({
            email: "admin@admin.com",
            password: "admin",

        }); //me da a resposta desse caminho. Mando o objeto lá pra rota com método post e ele me responde com algo.

        
        const { token } = responseToken.body;
        
        const response = await request(app).post("/categories").send({
            "name": "METEU ESSA MESMO MALUCO? OLHA O SUPERTEST",
            "description": "Categoria DO SUPERTEST"
        }).set({
            Authorization: `Bearer ${token}`,
        });
        expect( response.status).toBe(201)
    });


    it("should not be able to create a new category if category name already exists",async () => {

        const responseToken = await request(app).get("/sessions")
        .send({
            email: "admin@admin.com",
            password: "admin",

        }); //me da a resposta desse caminho. Mando o objeto lá pra rota com método post e ele me responde com algo.

        
        const { token } = responseToken.body;
        
        const response = await request(app).post("/categories").send({
            "name": "METEU ESSA MESMO MALUCO? OLHA O SUPERTEST",
            "description": "Categoria DO SUPERTEST"
        }).set({
            Authorization: `Bearer ${token}`,
        });
        expect( response.status).toBe(400)
    });
});