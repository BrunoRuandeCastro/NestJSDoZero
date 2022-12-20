import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
// construtor recebendo a instancia da classe CoursesService, 
// todos os métodos criados para service usamos aqui no controller
    constructor(private readonly courseService: CoursesService) { }

    @Get('all')
    findAll() {
        return this.courseService.findAll();
    };

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    };

    @Post()
    create(@Body() courseDto: CreateCourseDto) {
        return this.courseService.create(courseDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.courseService.delete(id);
    }
}
