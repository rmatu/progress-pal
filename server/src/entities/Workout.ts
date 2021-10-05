import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
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
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user: User) => user.userMetrics)
  user: User;

  @OneToMany(() => Exercise, (exercise: Exercise) => exercise.workout)
  exercise: Exercise;
}
