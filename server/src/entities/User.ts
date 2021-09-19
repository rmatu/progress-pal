import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserMetrics } from "./UserMetrics";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn() // This is a PK
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  // ! -> can't be null
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  // This could not be selected from GraphQL
  @Column({ nullable: true })
  password: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  isPremium: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  emailVerified: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  googleRegisetered: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  facebookRegisetered: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  subscriptionStart: Date;

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  onboardingStep: number;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserMetrics, userMetrics => userMetrics.user)
  @JoinColumn()
  userMetrics: UserMetrics;
}
