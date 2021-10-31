import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum AppMuscle {
  abdominals = "abdominals",
  hamstrings = "hamstrings",
  calves = "calves",
  shoulders = "shoulders",
  adductors = "adductors",
  glutes = "glutes",
  quadriceps = "quadriceps",
  biceps = "biceps",
  forearms = "forearms",
  abductors = "abductors",
  triceps = "triceps",
  chest = "chest",
  lower_back = "lower back",
  traps = "traps",
  middle_back = "middle back",
  lats = "lats",
  neck = "neck",
}

export enum Force {
  pull = "pull",
  push = "push",
  static = "static",
}

export enum Level {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert",
}

export enum Mechanic {
  compound = "compound",
  isolation = "isolation",
}

export enum Equipment {
  body = "body only",
  machine = "machine",
  kettlebells = "kettlebells",
  dumbbell = "dumbbell",
  cable = "cable",
  barbell = "barbell",
  bands = "bands",
  medicine_ball = "medicine ball",
  exercise_ball = "exercise ball",
  e_z_curl_bar = "e-z curl bar",
  foam_roll = "foam roll",
  other = "other",
}

export enum Category {
  strength = "strength",
  stretching = "stretching",
  plyometrics = "plyometrics",
  strongman = "strongman",
  powerlifting = "powerlifting",
  cardio = "cardio",
  olympic_weightlifting = "olympic weightlifting",
  crossfit = "crossfit",
  weighted_bodyweight = "weighted bodyweight",
  assisted_bodyweight = "assisted bodyweight",
}

export interface Exercise {
  name: string;
  primaryMuscles: AppMuscle[];
  secondaryMuscles: AppMuscle[];
  force?: Force;
  level: Level;
  mechanic?: Mechanic;
  equipment?: Equipment;
  category: Category;
  instructions: string[];
}

// ! IDK WHY DEFAULT ENUM NAME DOESN'T WORK, SO I HAD TO STAY WITH GENERIC NAME FOR ENUMS
@ObjectType()
@Entity()
export class CommonExercise extends BaseEntity {
  // SQL
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Fields
  @Field(() => String)
  @Column({ type: "text" })
  name: string;

  @Field(() => [String])
  @Column({
    name: "primary_muscles",
    type: "enum",
    enum: AppMuscle,
    array: true,
    default: [],
  })
  primaryMuscles: AppMuscle[];

  @Field(() => [String])
  @Column({
    name: "secondary_muscles",
    type: "enum",
    enum: AppMuscle,
    array: true,
    default: [],
  })
  secondaryMuscles: AppMuscle[];

  @Field(() => String)
  @Column({ type: "enum", enum: Force, nullable: true })
  force: Force;

  @Field(() => String)
  @Column({ type: "enum", enum: Level, nullable: true })
  level: Level;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    enum: Mechanic,
    nullable: true,
  })
  mechanic: Mechanic;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    enum: Equipment,
    nullable: true,
  })
  equipment: Equipment;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: Category,
    nullable: true,
  })
  category: Category;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  instructions: string[];

  @Field(() => String)
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
