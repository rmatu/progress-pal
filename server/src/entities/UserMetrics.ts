import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserMetrics extends BaseEntity {
  // SQL

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // Fields

  @Field(() => String)
  @Column()
  gender: string;

  @Field(() => String)
  @Column()
  weightGoal: string;

  @Field(() => String)
  @Column()
  activityLevel: string;

  @Field(() => Number)
  @Column()
  height: number;

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => String)
  @Column()
  birthDate: string;

  // Relations

  @OneToOne(() => User, user => user.userMetrics)
  user: User;
}
