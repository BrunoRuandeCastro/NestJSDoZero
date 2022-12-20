import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Module({
    controllers: [CoursesController],
    providers: [CoursesService],
    imports: [TypeOrmModule.forFeature([Course])]
})
export class CoursesModule { }
