import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCourses1653404949280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Courses',
            columns: [
                {
                    name:'id',
                    type:'uuid',
                    isPrimary: true
                },
                {
                    name:'name',
                    type:'varchar',
                },
                {
                    name:'description',
                    type:'varchar',
                },
                {
                    name:'created_at',
                    type:'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Courses')
    }

}
