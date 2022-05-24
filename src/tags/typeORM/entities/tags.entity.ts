import { Course } from "src/courses/typeORM/entities/course.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"

@Entity('Tags')
export class Tags {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(()=> Course, (Course)=> Course.tags)
    courses: Course[]
}