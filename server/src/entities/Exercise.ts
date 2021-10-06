import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ExerciseSet } from "./ExerciseSet";
import { Muscle } from "./Muscle";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  // SQL
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name: string;

  // Relations
  @Field(() => Workout)
  @ManyToOne(() => Workout, (workout: Workout) => workout.exercise)
  workout: Workout;

  @Field(() => [Muscle])
  @OneToMany(() => Muscle, (muscle: Muscle) => muscle.exercise)
  muscle: Muscle[];

  @Field(() => [ExerciseSet])
  @OneToMany(
    () => ExerciseSet,
    (exerciseSet: ExerciseSet) => exerciseSet.exercise,
  )
  exerciseSet: ExerciseSet[];
}
