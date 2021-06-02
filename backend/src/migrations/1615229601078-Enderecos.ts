import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEndereco1615070679201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(
            new Table({
                name: "endereco",
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
                        name: 'rua',
                        type: 'varchar(65)'
                    },
                    {
                        name: 'numero',
                        type: 'integer'
                    },
                    {
                        name: 'complemento',
                        type: 'varchar(32)'
                    },
                    {
                        name: 'cep',
                        type: 'varchar(12)'
                    },
                    {
                        name: 'cidade',
                        type: 'varchar(26)'
                    },
                    {
                        name: 'estado',
                        type: 'char(2)'
                    },
                    {
                        name: 'user_id',
                        type: 'uuid'
                      }
                ],
                foreignKeys: [
                    {
                        name: 'userEndereco',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')
        await queryRunner.dropTable("endereco")
    }

}
