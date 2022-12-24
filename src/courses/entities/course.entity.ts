import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
//INSERT e UPDATE em cascata para a entidade TAG
    @JoinTable()
    @ManyToMany(() => Tag, (tag)=> tag.course,{
        cascade:true
    })
    tag: Tag[];
}