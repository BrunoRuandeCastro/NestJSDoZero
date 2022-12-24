import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    //no primeiro parametro apontamos para a ENTIDADE a ser RELACIONADA
    //e no segundo parametro de que FORMA elas vão se RELACIONAR
    @ManyToMany(() => Course, (course) => course.tag)
    course: Course[];
}
