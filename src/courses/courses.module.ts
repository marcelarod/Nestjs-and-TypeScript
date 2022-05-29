import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from '../tags/typeORM/entities/tags.entity';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { Course } from './typeORM/entities/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tags])],
    controllers: [CoursesController],
    providers:[CoursesService]
})
export class CoursesModule {}
