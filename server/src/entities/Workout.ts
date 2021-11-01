import moment from "moment";
import { Field, Int, ObjectType } from "type-graphql";
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
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
  // SQL
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ default: moment().format(`[Workout] DD-MM-YYYY`) })
  name: string;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.workout)
  user: User;

  @Field(() => WorkoutExercise)
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise: WorkoutExercise) => workoutExercise.workout,
  )
  workoutExercise: WorkoutExercise;
}
