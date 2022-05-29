import { Entity, PrimaryGeneratedColumn, Column,  ManyToMany, JoinTable, CreateDateColumn,BeforeInsert } from "typeorm"
import { Tags } from "../../../tags/typeORM/entities/tags.entity"
 import {v4 as uuidv4} from 'uuid'
@Entity('Courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Tags, (tags)=> tags.courses,{
        cascade:true
    })
    @JoinTable({name:'CoursesTags'})
    tags: Tags[]
  
    @CreateDateColumn({type: 'timestamp'})
    created_at: Date

    @BeforeInsert()
    generatedId(){
        if(this.id){
            return
        }
        this.id = uuidv4()
    }
}