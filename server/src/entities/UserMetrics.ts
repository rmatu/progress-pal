import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserMetrics extends BaseEntity {
  // SQL
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  // Fields
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  weightGoal: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  weightGoalValue: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  activityLevel: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  height: number; // in cm

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  weight: number; // in grams

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user: User) => user.userMetrics)
  user: User;
}
