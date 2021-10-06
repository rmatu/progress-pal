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
export class ExerciseSet extends BaseEntity {
  // SQL
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column()
  set: number;

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => Number)
  @Column()
  reps: number;

  // Relations
  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise: Exercise) => exercise.exerciseSet)
  exercise: Exercise[];
}
