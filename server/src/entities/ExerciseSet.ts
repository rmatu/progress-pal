import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkoutExercise } from "./WorkoutExercise";

@ObjectType()
@Entity()
export class ExerciseSet extends BaseEntity {
  // SQL
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Number)
  @Column()
  set: number;

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => Number)
  @Column()
  reps: number;

  @Field(() => WorkoutExercise)
  @ManyToOne(
    () => WorkoutExercise,
    (workoutExercise: WorkoutExercise) => workoutExercise.exerciseSet,
    { onDelete: "CASCADE" },
  )
  workoutExercise: WorkoutExercise;
}
