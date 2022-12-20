import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRespository: Repository<Course>
    ) {}

    findAll() {
        return this.courseRespository.find();
    }

    findOne(id: string) {
        const course = this.courseRespository.findOne({ where: { id: Number(id) } });
        if (!course) {
            throw new NotFoundException(`Infelizmente, o curso de id: ${id}, não foi encontrado`);
        }

        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.courseRespository.create(createCourseDto);
        return this.courseRespository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRespository.preload({
            id: +id,
            ...updateCourseDto,
        });

        if (!course) {
            throw new NotFoundException(`Não foi possivel atualizar os dados do curso de id: ${id}\br Tetativa: ${updateCourseDto}`)
        }

        return this.courseRespository.save(course)
    }

    async delete(id: string) {
        const course = await this.courseRespository.findOne({ where: { id: Number(id) } });
        if (!course) {
            throw new NotFoundException(`Não foi possivel deletar os dados do curso de id: ${id}`)
        }

        return this.courseRespository.remove(course)
    }
}