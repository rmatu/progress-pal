import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class Muscle extends BaseEntity {
  // SQL
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name: string;

  // Relations
  @ManyToOne(() => Exercise, (exercise: Exercise) => exercise.muscle)
  exercise: Exercise;
}
