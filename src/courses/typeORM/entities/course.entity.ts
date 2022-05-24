import { Entity, PrimaryGeneratedColumn, Column,  ManyToMany, JoinTable, } from "typeorm"
import { Tags } from "../../../tags/typeORM/entities/tags.entity"

@Entity('Courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Tags, (tags)=> tags.courses,{
        cascade:true
    })
    @JoinTable()
    tags: Tags[]
  
}