import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Muscle } from "./Muscle";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
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

  @Field(() => String)
  @Column()
  name: string;

  // Relations
  @ManyToOne(() => Workout, (workout: Workout) => workout.exercise)
  workout: Workout;

  @OneToMany(() => Muscle, (muscle: Muscle) => muscle.exercise)
  muscle: Muscle;
}
