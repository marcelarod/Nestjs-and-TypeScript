import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/tags/typeORM/entities/tags.entity';
import { Repository } from 'typeorm';
import { CreateCousesDto } from '../typeORM/dto/create-couses.dto';
import { UpdateCousesDto } from '../typeORM/dto/update-couses.dto';
import { Course } from '../typeORM/entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseeRepository:Repository<Course>,

        @InjectRepository(Tags)
        private readonly tagsRepository:Repository<Tags>,

    ){ }
     findAll(){
         return this.courseeRepository.find({
             relations:['tags']
         })
     }

     findOne(id: number){
        let IdCourse = this.courseeRepository.findOne({ where: { id:id }, relations: ['tags'] });
        if(!IdCourse){
            throw new NotFoundException(`Course Id ${id} not found`,)
        }
           
      return IdCourse
        
    }
    async create(createCourseDto: CreateCousesDto){
        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.tagsPreload(name) )
        )

        const courses = this.courseeRepository.create({
            ...createCourseDto,
            tags,
        })
         this.courseeRepository.save(courses)
        return courses
    }

    async update(id: number, updateCourseDto: UpdateCousesDto){

        const tags = updateCourseDto.tags && (
            await Promise.all(
                updateCourseDto.tags.map(name => this.tagsPreload(name) )
            )    
        )
      
        const updatecCourses = await this.courseeRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags           
        })

        if(!updatecCourses){
            throw new NotFoundException(`Course Id ${id} not found`,)
        }
       return this.courseeRepository.save(updatecCourses)

   }
   async remove(id: number){
        const removeCourses = await this.courseeRepository.findOne({id: id})

        if(!removeCourses){
            throw new NotFoundException(`Course Id ${id} not found`,)
        }
        return this.courseeRepository.remove(removeCourses)
    }

    private async tagsPreload(name: string): Promise<Tags> {
        const tags = await this.tagsRepository.findOne({name: name})
        if(tags){
            return tags
        }

       return this.tagsRepository.create({name})

    }
}

