import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        { 
            id: 1,
            name: "Nest.js",
            description: "nest.js",
            tags: ["node.js","javascript" ]

        }
     ];
     findAll(){
         return this.courses
     }

     findOne(id: string){
        let IdCourse = this.courses.find((course: Course)=> course.id ===  Number(id))
        if(!IdCourse){
            throw new HttpException(
                `Course Id ${id} not found`,
                HttpStatus.NOT_FOUND
            )
        }
           
      return IdCourse
        
    }
    create(createCourseDto: any){
         this.courses.push(createCourseDto)
         return createCourseDto
    }
    update(id: string, updateCourseDto: any){
        let idCourse = this.courses.findIndex((course: Course)=> course.id ===  Number(id));

        this.courses[idCourse] = updateCourseDto
   }
   remove(id: string){
    let removeCourse = this.courses.findIndex((course: Course)=> course.id ===  Number(id));

    if(removeCourse >= 0 ){
        this.courses.splice(removeCourse, 1)

    }
}
}

