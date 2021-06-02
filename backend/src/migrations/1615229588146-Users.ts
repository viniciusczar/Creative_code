import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1615070573152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'nome',
                        type: 'varchar(65)'
                    },
                    {
                        name: 'telefone',
                        type: 'varchar(12)'    
                    },
                    {
                        name: 'email',
                        type: 'varchar(36)',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar(68)'
                    },
                    {
                        name: 'idade',
                        type: 'smallint'
                    },
                    {
                        name: 'peso',
                        type: 'smallint'
                    },
                    {
                        name: 'etinia',
                        type: 'smallint'
                    },

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')
        await queryRunner.dropTable("users")
        
    }

}
