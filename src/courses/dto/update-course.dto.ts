import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";

//PartialType - parte das restrições feitas no CreateCourseDto vale pra cá 
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
