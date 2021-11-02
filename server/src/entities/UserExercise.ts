import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  AppMuscle,
  Category,
  Equipment,
  Force,
  Level,
  Mechanic,
} from "./CommonExercise";
import { ExerciseSet } from "./ExerciseSet";
import { User } from "./User";
import { Workout } from "./Workout";
import { WorkoutExercise } from "./WorkoutExercise";

@ObjectType()
@Entity()
export class UserExercise extends BaseEntity {
  // SQL
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isCommonExercise: boolean;

  // // Fields
  // @Field(() => String)
  // @Column({ type: "text" })
  // name: string;
  // @Field(() => [String])
  // @Column({
  //   name: "primary_muscles",
  //   type: "enum",
  //   enum: AppMuscle,
  //   array: true,
  //   default: [],
  // })
  // primaryMuscles: AppMuscle[];
  // @Field(() => [String])
  // @Column({
  //   name: "secondary_muscles",
  //   type: "enum",
  //   enum: AppMuscle,
  //   array: true,
  //   default: [],
  // })
  // secondaryMuscles: AppMuscle[];
  // @Field(() => String, { nullable: true })
  // @Column({ type: "enum", enum: Force, nullable: true })
  // force: Force;
  // @Field(() => String)
  // @Column({ type: "enum", enum: Level, nullable: true })
  // level: Level;
  // @Field(() => String, { nullable: true })
  // @Column({
  //   type: "enum",
  //   enum: Mechanic,
  //   nullable: true,
  // })
  // mechanic: Mechanic;
  // @Field(() => String, { nullable: true })
  // @Column({
  //   type: "enum",
  //   enum: Equipment,
  //   nullable: true,
  // })
  // equipment: Equipment;
  // @Field(() => String)
  // @Column({
  //   type: "enum",
  //   enum: Category,
  //   nullable: true,
  // })
  // category: Category;
  // @Field(() => [String])
  // @Column({ type: "text", array: true })
  // instructions: string[];
  // @Field(() => String)
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.userExercise)
  user: User;

  @Field(() => [WorkoutExercise])
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise: WorkoutExercise) => workoutExercise.userExercise,
  )
  workoutExercise: WorkoutExercise;
}
