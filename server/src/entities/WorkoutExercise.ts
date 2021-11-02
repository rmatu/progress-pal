import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CommonExercise } from "./CommonExercise";
import { ExerciseSet } from "./ExerciseSet";
import { UserExercise } from "./UserExercise";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class WorkoutExercise extends BaseEntity {
  // SQL
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  // Relations
  @Field(() => Workout)
  @ManyToOne(() => Workout, (workout: Workout) => workout.workoutExercise)
  workout: Workout;

  @Field(() => [ExerciseSet])
  @OneToMany(
    () => ExerciseSet,
    (exerciseSet: ExerciseSet) => exerciseSet.workoutExercise,
  )
  exerciseSet: ExerciseSet;

  @Field(() => UserExercise, { nullable: true })
  @ManyToOne(
    () => UserExercise,
    (userExercise: UserExercise) => userExercise.workoutExercise,
  )
  userExercise: UserExercise;

  @Field(() => CommonExercise, { nullable: true })
  @ManyToOne(
    () => CommonExercise,
    (commonExercise: CommonExercise) => commonExercise.workoutExercise,
  )
  commonExercise: CommonExercise;
}
