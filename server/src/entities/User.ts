import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

//User can login either by email or by
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
  @Column({ unique: true})
  email!: string;

  // This could not be selected from GraphQL
  @Column()
  password!: string;

  @Field(() => Boolean)
  @Column()
  isPremium!: boolean

  @Field(() => String)
  @Column()
  subscriptionStart: Date;
}