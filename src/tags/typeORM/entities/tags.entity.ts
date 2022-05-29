import { Course } from "../../../courses/typeORM/entities/course.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany , CreateDateColumn, BeforeInsert} from "typeorm"

import {v4 as uuidv4} from 'uuid'

@Entity('Tags')
export class Tags {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(()=> Course, (Course)=> Course.tags)
    courses: Course[]

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