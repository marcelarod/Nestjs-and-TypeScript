import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCousesDto } from './dto/create-couses.dto';
import { UpdateCousesDto } from './dto/update-couses.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courserServices:CoursesService ){}

    @Get()
    findAll() {
        return this.courserServices.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courserServices.findOne(id)
    }
    
    @Post()
    createItens(@Body() CreateCousesDto: CreateCousesDto){
        return this.courserServices.create(CreateCousesDto)
    }

    @Patch(':id')
    updateItens(@Param('id') id: string, @Body() UpdateCousesDto: UpdateCousesDto){
        return this.courserServices.update(id, UpdateCousesDto)
    }

    @Delete()
    deleteItens(@Param('id') id: string,){
        return this.courserServices.remove(id)
    }
}
