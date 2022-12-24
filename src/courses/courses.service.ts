import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRespository: Repository<Course>,
        @InjectRepository(Tag)
        private readonly tagRespository: Repository<Tag>
    ) {}

    findAll() {
        return this.courseRespository.find({relations:['tag']});
    }

    findOne(id: string) {
        const course = this.courseRespository.findOne({ 
            where: { id: Number(id)},
            relations:['tag']});

        if (!course) {
            throw new NotFoundException(`Infelizmente, o curso de id: ${id}, não foi encontrado`);
        }

        return course;
    }

    async create(createCourseDto: CreateCourseDto) {
        const tag = await Promise.all(
            createCourseDto.tag.map((name)=> this.preloadTagByName(name))
        );

        const course = this.courseRespository.create({
            ...createCourseDto, tag});

        return this.courseRespository.save(course);
    }

    async update(id: string,updateCourseDto: UpdateCourseDto) {

        const tag = updateCourseDto.tag && (await Promise.all(
            updateCourseDto.tag.map((name) => this.preloadTagByName(name))));

        const course = await this.courseRespository.preload({
            id: +id,
            ...updateCourseDto,
            tag,
        });

        if (!course) {
            throw new NotFoundException(`Não foi possivel atualizar os dados do curso de id: ${id} Tetativa: ${updateCourseDto}`)
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

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRespository.findOne({ where: { name } });
        if (tag) {
            return tag;
        }

        return this.tagRespository.create({ name });
    }
}