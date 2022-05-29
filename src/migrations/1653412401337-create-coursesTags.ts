import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createCoursesTags1653412401337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'CoursesTags',
            columns: [
                {
                    name:'id',
                    type:'uuid',
                    isPrimary: true, 
                    generationStrategy : 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name:'tagsId',
                    type:'uuid',
                    isNullable:true
                },   
                {
                    name:'coursesId',
                    type:'uuid',
                    isNullable:true
                },      
                {
                    name:'created_at',
                    type:'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }         
            ]
        }))
        await queryRunner.createForeignKey("CoursesTags" , new TableForeignKey({
            name: 'CoursesTags_Courses',
            columnNames:['coursesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Courses'
         })
        )

        await queryRunner.createForeignKey("CoursesTags" , new TableForeignKey({
            name: 'CoursesTags_Tags',
            columnNames:['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Tags'
         })
        )
    }

    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('CoursesTags', 'CoursesTags_Courses')
        await queryRunner.dropForeignKey('CoursesTags', 'CoursesTags_Tags')

        await queryRunner.dropTable('CoursesTags')
    }

}
