import moment from "moment";
import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  Column,
} from "typeorm";
import { Exercise } from "./Exercise";
import { User } from "./User";

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
  @ManyToOne(() => User, (user: User) => user.userMetrics)
  user: User;

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, (exercise: Exercise) => exercise.workout)
  exercise: Exercise[];
}
