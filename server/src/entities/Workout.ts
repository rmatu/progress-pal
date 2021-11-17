import moment from "moment";
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
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
  // SQL
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ default: moment().format(`[Workout] DD-MM-YYYY`) })
  name: string;

  @Field(() => Date, { nullable: true })
  @Column({ default: null, type: "timestamp with time zone" })
  startTime: Date;

  @Field(() => Date)
  @Column({ default: moment(), type: "timestamp with time zone" })
  endTime: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.workout, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field(() => [WorkoutExercise])
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise: WorkoutExercise) => workoutExercise.workout,
    { onDelete: "CASCADE" },
  )
  workoutExercise: WorkoutExercise;
}
