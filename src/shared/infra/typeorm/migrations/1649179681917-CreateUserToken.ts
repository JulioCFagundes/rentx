import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToken1649179681917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'user_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,

                    },
                    {
                        name: 'refresh_token',
                        type: 'varchar'
                    },
                    {

                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'expires_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }

                ],
                foreignKeys: [
                    {
                        name: 'FKUserToken',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_tokens')
    }

}
