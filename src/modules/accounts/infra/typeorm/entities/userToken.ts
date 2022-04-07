import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { v4 as uuidV4 } from "uuid";





@Entity("user_tokens")
export class UserToken {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @Column()
    refresh_token: string;

    @Column()
    created_at: Date;

    @Column()
    expires_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }

}



