import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUserMetrics?: Maybe<Array<UserMetrics>>;
  getWeightChartData: Array<GetWieghtChartDataResponse>;
  getAllUserWorkouts?: Maybe<Array<Workout>>;
  getUserWorkouts?: Maybe<Array<Workout>>;
  getUserWorkout?: Maybe<Workout>;
  getUserLastWorkout?: Maybe<Workout>;
  getUserYearlyWorkoutData?: Maybe<Array<YearlyWorkoutsAmountResponse>>;
  getDataForMuscleHeatmap?: Maybe<DataForMuscleHeatmap>;
  getExerciseChartData: GetExerciseChartDataResponse;
  getExerciseInfo: GetExerciseInfoResponse;
  getMuscleBarChartData: GetMuscleBarChartDataResponse;
  getUserExercise: UserExercise;
  getAllUserExercise: Array<UserExercise>;
  getAllCommonExercises?: Maybe<Array<CommonExercise>>;
};


export type QueryGetWeightChartDataArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};


export type QueryGetUserWorkoutsArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryGetUserWorkoutArgs = {
  workoutId: Scalars['String'];
};


export type QueryGetUserYearlyWorkoutDataArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryGetDataForMuscleHeatmapArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryGetExerciseChartDataArgs = {
  input: GetExerciseChartDataInput;
};


export type QueryGetExerciseInfoArgs = {
  exerciseId: Scalars['String'];
};


export type QueryGetMuscleBarChartDataArgs = {
  input: GetMuscleBarChartDataInput;
};


export type QueryGetUserExerciseArgs = {
  exerciseId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  birthDate?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  isPremium: Scalars['Boolean'];
  emailVerified: Scalars['Boolean'];
  googleRegisetered: Scalars['Boolean'];
  facebookRegisetered: Scalars['Boolean'];
  subscriptionStart?: Maybe<Scalars['String']>;
  onboardingStep: Scalars['Int'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  userMetrics: Array<UserMetrics>;
  userExercise: Array<UserExercise>;
  workoutExercise: Array<WorkoutExercise>;
  workout: Array<Workout>;
};

export type UserMetrics = {
  __typename?: 'UserMetrics';
  id: Scalars['Int'];
  weightGoal?: Maybe<Scalars['String']>;
  weightGoalValue?: Maybe<Scalars['Float']>;
  activityLevel?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  user: User;
};

export type UserExercise = {
  __typename?: 'UserExercise';
  id: Scalars['String'];
  isCommonExercise: Scalars['Boolean'];
  name: Scalars['String'];
  primaryMuscles: Array<Scalars['String']>;
  secondaryMuscles: Array<Scalars['String']>;
  force?: Maybe<Scalars['String']>;
  level: Scalars['String'];
  mechanic?: Maybe<Scalars['String']>;
  equipment?: Maybe<Scalars['String']>;
  category: Scalars['String'];
  instructions: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  user: User;
  workoutExercise: Array<WorkoutExercise>;
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  workout: Workout;
  exerciseSet: Array<ExerciseSet>;
  userExercise?: Maybe<UserExercise>;
  user: User;
  commonExercise?: Maybe<CommonExercise>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['String'];
  name: Scalars['String'];
  startTime?: Maybe<Scalars['DateTime']>;
  endTime: Scalars['DateTime'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  user: User;
  workoutExercise: Array<WorkoutExercise>;
};


export type ExerciseSet = {
  __typename?: 'ExerciseSet';
  id: Scalars['String'];
  set: Scalars['Float'];
  weight: Scalars['Float'];
  reps: Scalars['Float'];
  workoutExercise: WorkoutExercise;
};

export type CommonExercise = {
  __typename?: 'CommonExercise';
  id: Scalars['String'];
  isCommonExercise: Scalars['Boolean'];
  name: Scalars['String'];
  primaryMuscles: Array<Scalars['String']>;
  secondaryMuscles: Array<Scalars['String']>;
  force?: Maybe<Scalars['String']>;
  level: Scalars['String'];
  mechanic?: Maybe<Scalars['String']>;
  equipment?: Maybe<Scalars['String']>;
  category: Scalars['String'];
  instructions: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  workoutExercise: Array<WorkoutExercise>;
};

export type GetWieghtChartDataResponse = {
  __typename?: 'GetWieghtChartDataResponse';
  date: Scalars['String'];
  weight: Scalars['Float'];
  id: Scalars['Float'];
};

export type YearlyWorkoutsAmountResponse = {
  __typename?: 'YearlyWorkoutsAmountResponse';
  date?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
};

export type DataForMuscleHeatmap = {
  __typename?: 'DataForMuscleHeatmap';
  primaryMuscles?: Maybe<Array<Muscles>>;
  secondaryMuscles?: Maybe<Array<Muscles>>;
};

export type Muscles = {
  __typename?: 'Muscles';
  muscleName: Scalars['String'];
  amount: Scalars['Float'];
};

export type GetExerciseChartDataResponse = {
  __typename?: 'GetExerciseChartDataResponse';
  maxWeightChartData: Array<MaxWeightChartData>;
  volumeChartData: Array<VolumeChartData>;
  weightSetChartData: Array<WeightSetChartData>;
};

export type MaxWeightChartData = {
  __typename?: 'MaxWeightChartData';
  date: Scalars['String'];
  maxWeight: Scalars['Float'];
};

export type VolumeChartData = {
  __typename?: 'VolumeChartData';
  date: Scalars['String'];
  volume: Scalars['Float'];
};

export type WeightSetChartData = {
  __typename?: 'WeightSetChartData';
  date: Scalars['String'];
  sets: Array<Scalars['Float']>;
};

export type GetExerciseChartDataInput = {
  exerciseId: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type GetExerciseInfoResponse = {
  __typename?: 'GetExerciseInfoResponse';
  id: Scalars['String'];
  name: Scalars['String'];
  primaryMuscles: Array<Scalars['String']>;
  secondaryMuscles: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  force?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  mechanic?: Maybe<Scalars['String']>;
  equipment?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  isCommonExercise: Scalars['Boolean'];
};

export type GetMuscleBarChartDataResponse = {
  __typename?: 'GetMuscleBarChartDataResponse';
  muscleBarChartData: Array<MuslceBarChartObjects>;
};

export type MuslceBarChartObjects = {
  __typename?: 'MuslceBarChartObjects';
  name: Scalars['String'];
  volume: Scalars['Float'];
};

export type GetMuscleBarChartDataInput = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendVerifyEmail: User;
  sendResetPasswordEmail: Scalars['Boolean'];
  changePassword: UserResponse;
  confirmUser: Scalars['Boolean'];
  signUpWithGoogle: UserResponse;
  signUpWithFacebook: UserResponse;
  signUp: UserResponse;
  signIn: UserResponse;
  signInWithGoogle: UserResponse;
  signInWithFacebook: UserResponse;
  logout: Scalars['Boolean'];
  changeOnboardingStep: User;
  finishOnboarding: UpdateOnboardingResponse;
  addNewWeight: UserMetrics;
  deleteWeight: UserMetrics;
  updateWeight: UserMetrics;
  createWorkout?: Maybe<Workout>;
  addNewExercisesToTheWorkout: Scalars['Boolean'];
  deleteWorkout: Scalars['Boolean'];
  updateExerciseSets: Scalars['Boolean'];
  updateGeneralWorkoutInfo: Workout;
  deleteWorkoutExercise: Scalars['Boolean'];
  createUserExercise: UserExercise;
  updateUserExercise: UserExercise;
  deleteUserExercise: UserExercise;
};


export type MutationSendVerifyEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationSignUpWithGoogleArgs = {
  email: Scalars['String'];
};


export type MutationSignUpWithFacebookArgs = {
  email: Scalars['String'];
};


export type MutationSignUpArgs = {
  options: UsernamePasswordInput;
};


export type MutationSignInArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationSignInWithGoogleArgs = {
  email: Scalars['String'];
};


export type MutationSignInWithFacebookArgs = {
  email: Scalars['String'];
};


export type MutationChangeOnboardingStepArgs = {
  step: Scalars['Float'];
};


export type MutationFinishOnboardingArgs = {
  input: CreateUserMetricsInput;
};


export type MutationAddNewWeightArgs = {
  date?: Maybe<Scalars['DateTime']>;
  weight: Scalars['Float'];
};


export type MutationDeleteWeightArgs = {
  weightId: Scalars['Float'];
};


export type MutationUpdateWeightArgs = {
  date?: Maybe<Scalars['DateTime']>;
  weightId: Scalars['Float'];
  weight: Scalars['Float'];
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationAddNewExercisesToTheWorkoutArgs = {
  input: AddNewExercisesToTheWorkoutInput;
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['String'];
};


export type MutationUpdateExerciseSetsArgs = {
  input: UpdateExerciseSets;
};


export type MutationUpdateGeneralWorkoutInfoArgs = {
  input: UpdateGeneralWorkoutInfoInput;
};


export type MutationDeleteWorkoutExerciseArgs = {
  workoutId: Scalars['String'];
  workoutExerciseId: Scalars['String'];
};


export type MutationCreateUserExerciseArgs = {
  input: CreateUserExerciseInput;
};


export type MutationUpdateUserExerciseArgs = {
  input: UpdateUserExerciseInput;
};


export type MutationDeleteUserExerciseArgs = {
  exerciseId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateOnboardingResponse = {
  __typename?: 'UpdateOnboardingResponse';
  userMetrics?: Maybe<UserMetrics>;
  user?: Maybe<User>;
};

export type CreateUserMetricsInput = {
  gender: Scalars['String'];
  weightGoal: Scalars['String'];
  activityLevel: Scalars['String'];
  height: Scalars['Float'];
  weight: Scalars['Float'];
  weightGoalValue: Scalars['Float'];
  birthDate: Scalars['String'];
};

export type CreateWorkoutInput = {
  date: Scalars['String'];
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  exercises: Array<ExercisesInput>;
};

export type ExercisesInput = {
  id: Scalars['String'];
  isCommonExercise: Scalars['Boolean'];
  name: Scalars['String'];
  sets: Array<SetInput>;
};

export type SetInput = {
  set: Scalars['Float'];
  weight: Scalars['Float'];
  reps: Scalars['Float'];
};

export type AddNewExercisesToTheWorkoutInput = {
  exercises: Array<ExercisesInput>;
  workoutId: Scalars['String'];
};

export type UpdateExerciseSets = {
  exerciseSets: Array<GqlExerciseSet>;
  newExerciseSets?: Maybe<Array<GqlNewExerciseSet>>;
  workoutId: Scalars['String'];
};

export type GqlExerciseSet = {
  id: Scalars['String'];
  reps: Scalars['Float'];
  weight: Scalars['Float'];
};

export type GqlNewExerciseSet = {
  id: Scalars['String'];
  set: Scalars['Float'];
  workoutExerciseId: Scalars['String'];
  reps: Scalars['Float'];
  weight: Scalars['Float'];
};

export type UpdateGeneralWorkoutInfoInput = {
  workoutId: Scalars['String'];
  workoutName?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
};

export type CreateUserExerciseInput = {
  name: Scalars['String'];
  primaryMuscles: Array<Scalars['String']>;
  secondaryMuscles?: Maybe<Array<Scalars['String']>>;
  force: Scalars['String'];
  level: Scalars['String'];
  mechanic?: Maybe<Scalars['String']>;
  equipment: Scalars['String'];
  category: Scalars['String'];
  instructions?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserExerciseInput = {
  exerciseId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  primaryMuscles?: Maybe<Array<Scalars['String']>>;
  secondaryMuscles?: Maybe<Array<Scalars['String']>>;
  force?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  mechanic?: Maybe<Scalars['String']>;
  equipment?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  instructions?: Maybe<Array<Scalars['String']>>;
};

export type RegularCommonExerciseFragment = (
  { __typename?: 'CommonExercise' }
  & Pick<CommonExercise, 'id' | 'isCommonExercise' | 'name' | 'primaryMuscles' | 'secondaryMuscles' | 'force' | 'level' | 'mechanic' | 'equipment' | 'category' | 'instructions' | 'updatedAt' | 'createdAt'>
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularExerciseSetFragment = (
  { __typename?: 'ExerciseSet' }
  & Pick<ExerciseSet, 'id' | 'set' | 'weight' | 'reps'>
);

export type RegularGetExerciseChartDataResponseFragment = (
  { __typename?: 'GetExerciseChartDataResponse' }
  & { volumeChartData: Array<(
    { __typename?: 'VolumeChartData' }
    & Pick<VolumeChartData, 'date' | 'volume'>
  )>, maxWeightChartData: Array<(
    { __typename?: 'MaxWeightChartData' }
    & Pick<MaxWeightChartData, 'date' | 'maxWeight'>
  )>, weightSetChartData: Array<(
    { __typename?: 'WeightSetChartData' }
    & Pick<WeightSetChartData, 'date' | 'sets'>
  )> }
);

export type RegularGetMuscleBarChartDataResponseFragment = (
  { __typename?: 'GetMuscleBarChartDataResponse' }
  & { muscleBarChartData: Array<(
    { __typename?: 'MuslceBarChartObjects' }
    & Pick<MuslceBarChartObjects, 'volume' | 'name'>
  )> }
);

export type RegularUpdateOnboardingResponseFragment = (
  { __typename?: 'UpdateOnboardingResponse' }
  & { userMetrics?: Maybe<(
    { __typename?: 'UserMetrics' }
    & RegularUserMetricsFragment
  )>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'isPremium' | 'emailVerified' | 'subscriptionStart' | 'onboardingStep'>
);

export type RegularUserExerciseFragment = (
  { __typename?: 'UserExercise' }
  & Pick<UserExercise, 'id' | 'isCommonExercise' | 'name' | 'primaryMuscles' | 'secondaryMuscles' | 'force' | 'level' | 'mechanic' | 'equipment' | 'category' | 'instructions' | 'updatedAt' | 'createdAt'>
);

export type RegularUserMetricsFragment = (
  { __typename?: 'UserMetrics' }
  & Pick<UserMetrics, 'id' | 'weightGoal' | 'activityLevel' | 'height' | 'weight'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type RegularWorkoutFragment = (
  { __typename?: 'Workout' }
  & Pick<Workout, 'id' | 'name' | 'startTime' | 'endTime' | 'updatedAt' | 'createdAt'>
  & { workoutExercise: Array<(
    { __typename?: 'WorkoutExercise' }
    & RegularWorkoutExerciseFragment
  )> }
);

export type RegularWorkoutExerciseFragment = (
  { __typename?: 'WorkoutExercise' }
  & Pick<WorkoutExercise, 'id' | 'updatedAt' | 'createdAt'>
  & { exerciseSet: Array<(
    { __typename?: 'ExerciseSet' }
    & RegularExerciseSetFragment
  )>, userExercise?: Maybe<(
    { __typename?: 'UserExercise' }
    & RegularUserExerciseFragment
  )>, commonExercise?: Maybe<(
    { __typename?: 'CommonExercise' }
    & RegularCommonExerciseFragment
  )> }
);

export type AddNewExercisesToTheWorkoutMutationVariables = Exact<{
  input: AddNewExercisesToTheWorkoutInput;
}>;


export type AddNewExercisesToTheWorkoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addNewExercisesToTheWorkout'>
);

export type AddNewWeightMutationVariables = Exact<{
  weight: Scalars['Float'];
  date?: Maybe<Scalars['DateTime']>;
}>;


export type AddNewWeightMutation = (
  { __typename?: 'Mutation' }
  & { addNewWeight: (
    { __typename?: 'UserMetrics' }
    & Pick<UserMetrics, 'weight'>
  ) }
);

export type ChangeOnboardingStepMutationVariables = Exact<{
  step: Scalars['Float'];
}>;


export type ChangeOnboardingStepMutation = (
  { __typename?: 'Mutation' }
  & { changeOnboardingStep: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type CreateUserExerciseMutationVariables = Exact<{
  input: CreateUserExerciseInput;
}>;


export type CreateUserExerciseMutation = (
  { __typename?: 'Mutation' }
  & { createUserExercise: (
    { __typename?: 'UserExercise' }
    & Pick<UserExercise, 'id'>
  ) }
);

export type CreateWorkoutMutationVariables = Exact<{
  input: CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { createWorkout?: Maybe<(
    { __typename?: 'Workout' }
    & Pick<Workout, 'name'>
  )> }
);

export type DeleteWeightMutationVariables = Exact<{
  weightId: Scalars['Float'];
}>;


export type DeleteWeightMutation = (
  { __typename?: 'Mutation' }
  & { deleteWeight: (
    { __typename?: 'UserMetrics' }
    & Pick<UserMetrics, 'id' | 'weight'>
  ) }
);

export type DeleteWorkoutMutationVariables = Exact<{
  workoutId: Scalars['String'];
}>;


export type DeleteWorkoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorkout'>
);

export type DeleteWorkoutExerciseMutationVariables = Exact<{
  workoutId: Scalars['String'];
  workoutExerciseId: Scalars['String'];
}>;


export type DeleteWorkoutExerciseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorkoutExercise'>
);

export type FinishOnboardingMutationVariables = Exact<{
  input: CreateUserMetricsInput;
}>;


export type FinishOnboardingMutation = (
  { __typename?: 'Mutation' }
  & { finishOnboarding: (
    { __typename?: 'UpdateOnboardingResponse' }
    & RegularUpdateOnboardingResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SendResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendResetPasswordEmail'>
);

export type SendVerifyEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendVerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & { sendVerifyEmail: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type SignInMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SignInWithFacebookMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignInWithFacebookMutation = (
  { __typename?: 'Mutation' }
  & { signInWithFacebook: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SignInWithGoogleMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignInWithGoogleMutation = (
  { __typename?: 'Mutation' }
  & { signInWithGoogle: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SignUpMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SignUpWithFacebookMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignUpWithFacebookMutation = (
  { __typename?: 'Mutation' }
  & { signUpWithFacebook: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SignUpWithGoogleMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignUpWithGoogleMutation = (
  { __typename?: 'Mutation' }
  & { signUpWithGoogle: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateExerciseSetsMutationVariables = Exact<{
  input: UpdateExerciseSets;
}>;


export type UpdateExerciseSetsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateExerciseSets'>
);

export type UpdateGeneralWorkoutInfoMutationVariables = Exact<{
  input: UpdateGeneralWorkoutInfoInput;
}>;


export type UpdateGeneralWorkoutInfoMutation = (
  { __typename?: 'Mutation' }
  & { updateGeneralWorkoutInfo: (
    { __typename?: 'Workout' }
    & RegularWorkoutFragment
  ) }
);

export type UpdateWeightMutationVariables = Exact<{
  weight: Scalars['Float'];
  weightId: Scalars['Float'];
  date?: Maybe<Scalars['DateTime']>;
}>;


export type UpdateWeightMutation = (
  { __typename?: 'Mutation' }
  & { updateWeight: (
    { __typename?: 'UserMetrics' }
    & Pick<UserMetrics, 'weight'>
  ) }
);

export type GetAllCommonExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCommonExercisesQuery = (
  { __typename?: 'Query' }
  & { getAllCommonExercises?: Maybe<Array<(
    { __typename?: 'CommonExercise' }
    & RegularCommonExerciseFragment
  )>> }
);

export type GetAllUserWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserWorkoutsQuery = (
  { __typename?: 'Query' }
  & { getAllUserWorkouts?: Maybe<Array<(
    { __typename?: 'Workout' }
    & RegularWorkoutFragment
  )>> }
);

export type GetDataForMuscleHeatmapQueryVariables = Exact<{
  startDate: Scalars['String'];
  endDate: Scalars['String'];
}>;


export type GetDataForMuscleHeatmapQuery = (
  { __typename?: 'Query' }
  & { getDataForMuscleHeatmap?: Maybe<(
    { __typename?: 'DataForMuscleHeatmap' }
    & { primaryMuscles?: Maybe<Array<(
      { __typename?: 'Muscles' }
      & Pick<Muscles, 'muscleName' | 'amount'>
    )>>, secondaryMuscles?: Maybe<Array<(
      { __typename?: 'Muscles' }
      & Pick<Muscles, 'muscleName' | 'amount'>
    )>> }
  )> }
);

export type GetExerciseChartDataQueryVariables = Exact<{
  input: GetExerciseChartDataInput;
}>;


export type GetExerciseChartDataQuery = (
  { __typename?: 'Query' }
  & { getExerciseChartData: (
    { __typename?: 'GetExerciseChartDataResponse' }
    & RegularGetExerciseChartDataResponseFragment
  ) }
);

export type GetExerciseInfoQueryVariables = Exact<{
  exerciseId: Scalars['String'];
}>;


export type GetExerciseInfoQuery = (
  { __typename?: 'Query' }
  & { getExerciseInfo: (
    { __typename?: 'GetExerciseInfoResponse' }
    & Pick<GetExerciseInfoResponse, 'id' | 'name' | 'primaryMuscles' | 'secondaryMuscles' | 'instructions' | 'force' | 'level' | 'mechanic' | 'equipment' | 'category' | 'isCommonExercise'>
  ) }
);

export type GetMuscleBarChartDataQueryVariables = Exact<{
  input: GetMuscleBarChartDataInput;
}>;


export type GetMuscleBarChartDataQuery = (
  { __typename?: 'Query' }
  & { getMuscleBarChartData: (
    { __typename?: 'GetMuscleBarChartDataResponse' }
    & RegularGetMuscleBarChartDataResponseFragment
  ) }
);

export type GetUserLastWorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserLastWorkoutQuery = (
  { __typename?: 'Query' }
  & { getUserLastWorkout?: Maybe<(
    { __typename?: 'Workout' }
    & RegularWorkoutFragment
  )> }
);

export type GetUserWorkoutQueryVariables = Exact<{
  workoutId: Scalars['String'];
}>;


export type GetUserWorkoutQuery = (
  { __typename?: 'Query' }
  & { getUserWorkout?: Maybe<(
    { __typename?: 'Workout' }
    & RegularWorkoutFragment
  )> }
);

export type GetUserWorkoutsQueryVariables = Exact<{
  startDate: Scalars['String'];
  endDate: Scalars['String'];
}>;


export type GetUserWorkoutsQuery = (
  { __typename?: 'Query' }
  & { getUserWorkouts?: Maybe<Array<(
    { __typename?: 'Workout' }
    & RegularWorkoutFragment
  )>> }
);

export type GetUserYearlyWorkoutDataQueryVariables = Exact<{
  startDate: Scalars['String'];
  endDate: Scalars['String'];
}>;


export type GetUserYearlyWorkoutDataQuery = (
  { __typename?: 'Query' }
  & { getUserYearlyWorkoutData?: Maybe<Array<(
    { __typename?: 'YearlyWorkoutsAmountResponse' }
    & Pick<YearlyWorkoutsAmountResponse, 'date' | 'amount'>
  )>> }
);

export type GetWeightChartDataQueryVariables = Exact<{
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type GetWeightChartDataQuery = (
  { __typename?: 'Query' }
  & { getWeightChartData: Array<(
    { __typename?: 'GetWieghtChartDataResponse' }
    & Pick<GetWieghtChartDataResponse, 'date' | 'weight' | 'id'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularGetExerciseChartDataResponseFragmentDoc = gql`
    fragment RegularGetExerciseChartDataResponse on GetExerciseChartDataResponse {
  volumeChartData {
    date
    volume
  }
  maxWeightChartData {
    date
    maxWeight
  }
  weightSetChartData {
    date
    sets
  }
}
    `;
export const RegularGetMuscleBarChartDataResponseFragmentDoc = gql`
    fragment RegularGetMuscleBarChartDataResponse on GetMuscleBarChartDataResponse {
  muscleBarChartData {
    volume
    name
  }
}
    `;
export const RegularUserMetricsFragmentDoc = gql`
    fragment RegularUserMetrics on UserMetrics {
  id
  weightGoal
  activityLevel
  height
  weight
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  isPremium
  emailVerified
  subscriptionStart
  onboardingStep
}
    `;
export const RegularUpdateOnboardingResponseFragmentDoc = gql`
    fragment RegularUpdateOnboardingResponse on UpdateOnboardingResponse {
  userMetrics {
    ...RegularUserMetrics
  }
  user {
    ...RegularUser
  }
}
    ${RegularUserMetricsFragmentDoc}
${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const RegularExerciseSetFragmentDoc = gql`
    fragment RegularExerciseSet on ExerciseSet {
  id
  set
  weight
  reps
}
    `;
export const RegularUserExerciseFragmentDoc = gql`
    fragment RegularUserExercise on UserExercise {
  id
  isCommonExercise
  name
  primaryMuscles
  secondaryMuscles
  force
  level
  mechanic
  equipment
  category
  instructions
  updatedAt
  createdAt
}
    `;
export const RegularCommonExerciseFragmentDoc = gql`
    fragment RegularCommonExercise on CommonExercise {
  id
  isCommonExercise
  name
  primaryMuscles
  secondaryMuscles
  force
  level
  mechanic
  equipment
  category
  instructions
  updatedAt
  createdAt
}
    `;
export const RegularWorkoutExerciseFragmentDoc = gql`
    fragment RegularWorkoutExercise on WorkoutExercise {
  id
  updatedAt
  createdAt
  exerciseSet {
    ...RegularExerciseSet
  }
  userExercise {
    ...RegularUserExercise
  }
  commonExercise {
    ...RegularCommonExercise
  }
}
    ${RegularExerciseSetFragmentDoc}
${RegularUserExerciseFragmentDoc}
${RegularCommonExerciseFragmentDoc}`;
export const RegularWorkoutFragmentDoc = gql`
    fragment RegularWorkout on Workout {
  id
  name
  startTime
  endTime
  updatedAt
  createdAt
  workoutExercise {
    ...RegularWorkoutExercise
  }
}
    ${RegularWorkoutExerciseFragmentDoc}`;
export const AddNewExercisesToTheWorkoutDocument = gql`
    mutation AddNewExercisesToTheWorkout($input: AddNewExercisesToTheWorkoutInput!) {
  addNewExercisesToTheWorkout(input: $input)
}
    `;
export type AddNewExercisesToTheWorkoutMutationFn = Apollo.MutationFunction<AddNewExercisesToTheWorkoutMutation, AddNewExercisesToTheWorkoutMutationVariables>;

/**
 * __useAddNewExercisesToTheWorkoutMutation__
 *
 * To run a mutation, you first call `useAddNewExercisesToTheWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewExercisesToTheWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewExercisesToTheWorkoutMutation, { data, loading, error }] = useAddNewExercisesToTheWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNewExercisesToTheWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddNewExercisesToTheWorkoutMutation, AddNewExercisesToTheWorkoutMutationVariables>) {
        return Apollo.useMutation<AddNewExercisesToTheWorkoutMutation, AddNewExercisesToTheWorkoutMutationVariables>(AddNewExercisesToTheWorkoutDocument, baseOptions);
      }
export type AddNewExercisesToTheWorkoutMutationHookResult = ReturnType<typeof useAddNewExercisesToTheWorkoutMutation>;
export type AddNewExercisesToTheWorkoutMutationResult = Apollo.MutationResult<AddNewExercisesToTheWorkoutMutation>;
export type AddNewExercisesToTheWorkoutMutationOptions = Apollo.BaseMutationOptions<AddNewExercisesToTheWorkoutMutation, AddNewExercisesToTheWorkoutMutationVariables>;
export const AddNewWeightDocument = gql`
    mutation AddNewWeight($weight: Float!, $date: DateTime) {
  addNewWeight(weight: $weight, date: $date) {
    weight
  }
}
    `;
export type AddNewWeightMutationFn = Apollo.MutationFunction<AddNewWeightMutation, AddNewWeightMutationVariables>;

/**
 * __useAddNewWeightMutation__
 *
 * To run a mutation, you first call `useAddNewWeightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewWeightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewWeightMutation, { data, loading, error }] = useAddNewWeightMutation({
 *   variables: {
 *      weight: // value for 'weight'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useAddNewWeightMutation(baseOptions?: Apollo.MutationHookOptions<AddNewWeightMutation, AddNewWeightMutationVariables>) {
        return Apollo.useMutation<AddNewWeightMutation, AddNewWeightMutationVariables>(AddNewWeightDocument, baseOptions);
      }
export type AddNewWeightMutationHookResult = ReturnType<typeof useAddNewWeightMutation>;
export type AddNewWeightMutationResult = Apollo.MutationResult<AddNewWeightMutation>;
export type AddNewWeightMutationOptions = Apollo.BaseMutationOptions<AddNewWeightMutation, AddNewWeightMutationVariables>;
export const ChangeOnboardingStepDocument = gql`
    mutation ChangeOnboardingStep($step: Float!) {
  changeOnboardingStep(step: $step) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type ChangeOnboardingStepMutationFn = Apollo.MutationFunction<ChangeOnboardingStepMutation, ChangeOnboardingStepMutationVariables>;

/**
 * __useChangeOnboardingStepMutation__
 *
 * To run a mutation, you first call `useChangeOnboardingStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOnboardingStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOnboardingStepMutation, { data, loading, error }] = useChangeOnboardingStepMutation({
 *   variables: {
 *      step: // value for 'step'
 *   },
 * });
 */
export function useChangeOnboardingStepMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOnboardingStepMutation, ChangeOnboardingStepMutationVariables>) {
        return Apollo.useMutation<ChangeOnboardingStepMutation, ChangeOnboardingStepMutationVariables>(ChangeOnboardingStepDocument, baseOptions);
      }
export type ChangeOnboardingStepMutationHookResult = ReturnType<typeof useChangeOnboardingStepMutation>;
export type ChangeOnboardingStepMutationResult = Apollo.MutationResult<ChangeOnboardingStepMutation>;
export type ChangeOnboardingStepMutationOptions = Apollo.BaseMutationOptions<ChangeOnboardingStepMutation, ChangeOnboardingStepMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $token: String!) {
  changePassword(password: $password, token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const CreateUserExerciseDocument = gql`
    mutation CreateUserExercise($input: CreateUserExerciseInput!) {
  createUserExercise(input: $input) {
    id
  }
}
    `;
export type CreateUserExerciseMutationFn = Apollo.MutationFunction<CreateUserExerciseMutation, CreateUserExerciseMutationVariables>;

/**
 * __useCreateUserExerciseMutation__
 *
 * To run a mutation, you first call `useCreateUserExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserExerciseMutation, { data, loading, error }] = useCreateUserExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserExerciseMutation, CreateUserExerciseMutationVariables>) {
        return Apollo.useMutation<CreateUserExerciseMutation, CreateUserExerciseMutationVariables>(CreateUserExerciseDocument, baseOptions);
      }
export type CreateUserExerciseMutationHookResult = ReturnType<typeof useCreateUserExerciseMutation>;
export type CreateUserExerciseMutationResult = Apollo.MutationResult<CreateUserExerciseMutation>;
export type CreateUserExerciseMutationOptions = Apollo.BaseMutationOptions<CreateUserExerciseMutation, CreateUserExerciseMutationVariables>;
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    name
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, baseOptions);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const DeleteWeightDocument = gql`
    mutation DeleteWeight($weightId: Float!) {
  deleteWeight(weightId: $weightId) {
    id
    weight
  }
}
    `;
export type DeleteWeightMutationFn = Apollo.MutationFunction<DeleteWeightMutation, DeleteWeightMutationVariables>;

/**
 * __useDeleteWeightMutation__
 *
 * To run a mutation, you first call `useDeleteWeightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWeightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWeightMutation, { data, loading, error }] = useDeleteWeightMutation({
 *   variables: {
 *      weightId: // value for 'weightId'
 *   },
 * });
 */
export function useDeleteWeightMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWeightMutation, DeleteWeightMutationVariables>) {
        return Apollo.useMutation<DeleteWeightMutation, DeleteWeightMutationVariables>(DeleteWeightDocument, baseOptions);
      }
export type DeleteWeightMutationHookResult = ReturnType<typeof useDeleteWeightMutation>;
export type DeleteWeightMutationResult = Apollo.MutationResult<DeleteWeightMutation>;
export type DeleteWeightMutationOptions = Apollo.BaseMutationOptions<DeleteWeightMutation, DeleteWeightMutationVariables>;
export const DeleteWorkoutDocument = gql`
    mutation DeleteWorkout($workoutId: String!) {
  deleteWorkout(workoutId: $workoutId)
}
    `;
export type DeleteWorkoutMutationFn = Apollo.MutationFunction<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;

/**
 * __useDeleteWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutMutation, { data, loading, error }] = useDeleteWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useDeleteWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>) {
        return Apollo.useMutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, baseOptions);
      }
export type DeleteWorkoutMutationHookResult = ReturnType<typeof useDeleteWorkoutMutation>;
export type DeleteWorkoutMutationResult = Apollo.MutationResult<DeleteWorkoutMutation>;
export type DeleteWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;
export const DeleteWorkoutExerciseDocument = gql`
    mutation DeleteWorkoutExercise($workoutId: String!, $workoutExerciseId: String!) {
  deleteWorkoutExercise(
    workoutId: $workoutId
    workoutExerciseId: $workoutExerciseId
  )
}
    `;
export type DeleteWorkoutExerciseMutationFn = Apollo.MutationFunction<DeleteWorkoutExerciseMutation, DeleteWorkoutExerciseMutationVariables>;

/**
 * __useDeleteWorkoutExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutExerciseMutation, { data, loading, error }] = useDeleteWorkoutExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      workoutExerciseId: // value for 'workoutExerciseId'
 *   },
 * });
 */
export function useDeleteWorkoutExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutExerciseMutation, DeleteWorkoutExerciseMutationVariables>) {
        return Apollo.useMutation<DeleteWorkoutExerciseMutation, DeleteWorkoutExerciseMutationVariables>(DeleteWorkoutExerciseDocument, baseOptions);
      }
export type DeleteWorkoutExerciseMutationHookResult = ReturnType<typeof useDeleteWorkoutExerciseMutation>;
export type DeleteWorkoutExerciseMutationResult = Apollo.MutationResult<DeleteWorkoutExerciseMutation>;
export type DeleteWorkoutExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutExerciseMutation, DeleteWorkoutExerciseMutationVariables>;
export const FinishOnboardingDocument = gql`
    mutation FinishOnboarding($input: CreateUserMetricsInput!) {
  finishOnboarding(input: $input) {
    ...RegularUpdateOnboardingResponse
  }
}
    ${RegularUpdateOnboardingResponseFragmentDoc}`;
export type FinishOnboardingMutationFn = Apollo.MutationFunction<FinishOnboardingMutation, FinishOnboardingMutationVariables>;

/**
 * __useFinishOnboardingMutation__
 *
 * To run a mutation, you first call `useFinishOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishOnboardingMutation, { data, loading, error }] = useFinishOnboardingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFinishOnboardingMutation(baseOptions?: Apollo.MutationHookOptions<FinishOnboardingMutation, FinishOnboardingMutationVariables>) {
        return Apollo.useMutation<FinishOnboardingMutation, FinishOnboardingMutationVariables>(FinishOnboardingDocument, baseOptions);
      }
export type FinishOnboardingMutationHookResult = ReturnType<typeof useFinishOnboardingMutation>;
export type FinishOnboardingMutationResult = Apollo.MutationResult<FinishOnboardingMutation>;
export type FinishOnboardingMutationOptions = Apollo.BaseMutationOptions<FinishOnboardingMutation, FinishOnboardingMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SendResetPasswordEmailDocument = gql`
    mutation SendResetPasswordEmail($email: String!) {
  sendResetPasswordEmail(email: $email)
}
    `;
export type SendResetPasswordEmailMutationFn = Apollo.MutationFunction<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;

/**
 * __useSendResetPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordEmailMutation, { data, loading, error }] = useSendResetPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>) {
        return Apollo.useMutation<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>(SendResetPasswordEmailDocument, baseOptions);
      }
export type SendResetPasswordEmailMutationHookResult = ReturnType<typeof useSendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationResult = Apollo.MutationResult<SendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const SendVerifyEmailDocument = gql`
    mutation SendVerifyEmail($email: String!) {
  sendVerifyEmail(email: $email) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type SendVerifyEmailMutationFn = Apollo.MutationFunction<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>;

/**
 * __useSendVerifyEmailMutation__
 *
 * To run a mutation, you first call `useSendVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerifyEmailMutation, { data, loading, error }] = useSendVerifyEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>) {
        return Apollo.useMutation<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>(SendVerifyEmailDocument, baseOptions);
      }
export type SendVerifyEmailMutationHookResult = ReturnType<typeof useSendVerifyEmailMutation>;
export type SendVerifyEmailMutationResult = Apollo.MutationResult<SendVerifyEmailMutation>;
export type SendVerifyEmailMutationOptions = Apollo.BaseMutationOptions<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($usernameOrEmail: String!, $password: String!) {
  signIn(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignInWithFacebookDocument = gql`
    mutation SignInWithFacebook($email: String!) {
  signInWithFacebook(email: $email) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignInWithFacebookMutationFn = Apollo.MutationFunction<SignInWithFacebookMutation, SignInWithFacebookMutationVariables>;

/**
 * __useSignInWithFacebookMutation__
 *
 * To run a mutation, you first call `useSignInWithFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithFacebookMutation, { data, loading, error }] = useSignInWithFacebookMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignInWithFacebookMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithFacebookMutation, SignInWithFacebookMutationVariables>) {
        return Apollo.useMutation<SignInWithFacebookMutation, SignInWithFacebookMutationVariables>(SignInWithFacebookDocument, baseOptions);
      }
export type SignInWithFacebookMutationHookResult = ReturnType<typeof useSignInWithFacebookMutation>;
export type SignInWithFacebookMutationResult = Apollo.MutationResult<SignInWithFacebookMutation>;
export type SignInWithFacebookMutationOptions = Apollo.BaseMutationOptions<SignInWithFacebookMutation, SignInWithFacebookMutationVariables>;
export const SignInWithGoogleDocument = gql`
    mutation SignInWithGoogle($email: String!) {
  signInWithGoogle(email: $email) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignInWithGoogleMutationFn = Apollo.MutationFunction<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>;

/**
 * __useSignInWithGoogleMutation__
 *
 * To run a mutation, you first call `useSignInWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithGoogleMutation, { data, loading, error }] = useSignInWithGoogleMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignInWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>) {
        return Apollo.useMutation<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>(SignInWithGoogleDocument, baseOptions);
      }
export type SignInWithGoogleMutationHookResult = ReturnType<typeof useSignInWithGoogleMutation>;
export type SignInWithGoogleMutationResult = Apollo.MutationResult<SignInWithGoogleMutation>;
export type SignInWithGoogleMutationOptions = Apollo.BaseMutationOptions<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($options: UsernamePasswordInput!) {
  signUp(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignUpWithFacebookDocument = gql`
    mutation SignUpWithFacebook($email: String!) {
  signUpWithFacebook(email: $email) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignUpWithFacebookMutationFn = Apollo.MutationFunction<SignUpWithFacebookMutation, SignUpWithFacebookMutationVariables>;

/**
 * __useSignUpWithFacebookMutation__
 *
 * To run a mutation, you first call `useSignUpWithFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithFacebookMutation, { data, loading, error }] = useSignUpWithFacebookMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpWithFacebookMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWithFacebookMutation, SignUpWithFacebookMutationVariables>) {
        return Apollo.useMutation<SignUpWithFacebookMutation, SignUpWithFacebookMutationVariables>(SignUpWithFacebookDocument, baseOptions);
      }
export type SignUpWithFacebookMutationHookResult = ReturnType<typeof useSignUpWithFacebookMutation>;
export type SignUpWithFacebookMutationResult = Apollo.MutationResult<SignUpWithFacebookMutation>;
export type SignUpWithFacebookMutationOptions = Apollo.BaseMutationOptions<SignUpWithFacebookMutation, SignUpWithFacebookMutationVariables>;
export const SignUpWithGoogleDocument = gql`
    mutation SignUpWithGoogle($email: String!) {
  signUpWithGoogle(email: $email) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignUpWithGoogleMutationFn = Apollo.MutationFunction<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;

/**
 * __useSignUpWithGoogleMutation__
 *
 * To run a mutation, you first call `useSignUpWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithGoogleMutation, { data, loading, error }] = useSignUpWithGoogleMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>) {
        return Apollo.useMutation<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>(SignUpWithGoogleDocument, baseOptions);
      }
export type SignUpWithGoogleMutationHookResult = ReturnType<typeof useSignUpWithGoogleMutation>;
export type SignUpWithGoogleMutationResult = Apollo.MutationResult<SignUpWithGoogleMutation>;
export type SignUpWithGoogleMutationOptions = Apollo.BaseMutationOptions<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;
export const UpdateExerciseSetsDocument = gql`
    mutation UpdateExerciseSets($input: UpdateExerciseSets!) {
  updateExerciseSets(input: $input)
}
    `;
export type UpdateExerciseSetsMutationFn = Apollo.MutationFunction<UpdateExerciseSetsMutation, UpdateExerciseSetsMutationVariables>;

/**
 * __useUpdateExerciseSetsMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseSetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseSetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseSetsMutation, { data, loading, error }] = useUpdateExerciseSetsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExerciseSetsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseSetsMutation, UpdateExerciseSetsMutationVariables>) {
        return Apollo.useMutation<UpdateExerciseSetsMutation, UpdateExerciseSetsMutationVariables>(UpdateExerciseSetsDocument, baseOptions);
      }
export type UpdateExerciseSetsMutationHookResult = ReturnType<typeof useUpdateExerciseSetsMutation>;
export type UpdateExerciseSetsMutationResult = Apollo.MutationResult<UpdateExerciseSetsMutation>;
export type UpdateExerciseSetsMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseSetsMutation, UpdateExerciseSetsMutationVariables>;
export const UpdateGeneralWorkoutInfoDocument = gql`
    mutation UpdateGeneralWorkoutInfo($input: UpdateGeneralWorkoutInfoInput!) {
  updateGeneralWorkoutInfo(input: $input) {
    ...RegularWorkout
  }
}
    ${RegularWorkoutFragmentDoc}`;
export type UpdateGeneralWorkoutInfoMutationFn = Apollo.MutationFunction<UpdateGeneralWorkoutInfoMutation, UpdateGeneralWorkoutInfoMutationVariables>;

/**
 * __useUpdateGeneralWorkoutInfoMutation__
 *
 * To run a mutation, you first call `useUpdateGeneralWorkoutInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGeneralWorkoutInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGeneralWorkoutInfoMutation, { data, loading, error }] = useUpdateGeneralWorkoutInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGeneralWorkoutInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGeneralWorkoutInfoMutation, UpdateGeneralWorkoutInfoMutationVariables>) {
        return Apollo.useMutation<UpdateGeneralWorkoutInfoMutation, UpdateGeneralWorkoutInfoMutationVariables>(UpdateGeneralWorkoutInfoDocument, baseOptions);
      }
export type UpdateGeneralWorkoutInfoMutationHookResult = ReturnType<typeof useUpdateGeneralWorkoutInfoMutation>;
export type UpdateGeneralWorkoutInfoMutationResult = Apollo.MutationResult<UpdateGeneralWorkoutInfoMutation>;
export type UpdateGeneralWorkoutInfoMutationOptions = Apollo.BaseMutationOptions<UpdateGeneralWorkoutInfoMutation, UpdateGeneralWorkoutInfoMutationVariables>;
export const UpdateWeightDocument = gql`
    mutation UpdateWeight($weight: Float!, $weightId: Float!, $date: DateTime) {
  updateWeight(weight: $weight, weightId: $weightId, date: $date) {
    weight
  }
}
    `;
export type UpdateWeightMutationFn = Apollo.MutationFunction<UpdateWeightMutation, UpdateWeightMutationVariables>;

/**
 * __useUpdateWeightMutation__
 *
 * To run a mutation, you first call `useUpdateWeightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWeightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWeightMutation, { data, loading, error }] = useUpdateWeightMutation({
 *   variables: {
 *      weight: // value for 'weight'
 *      weightId: // value for 'weightId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useUpdateWeightMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWeightMutation, UpdateWeightMutationVariables>) {
        return Apollo.useMutation<UpdateWeightMutation, UpdateWeightMutationVariables>(UpdateWeightDocument, baseOptions);
      }
export type UpdateWeightMutationHookResult = ReturnType<typeof useUpdateWeightMutation>;
export type UpdateWeightMutationResult = Apollo.MutationResult<UpdateWeightMutation>;
export type UpdateWeightMutationOptions = Apollo.BaseMutationOptions<UpdateWeightMutation, UpdateWeightMutationVariables>;
export const GetAllCommonExercisesDocument = gql`
    query GetAllCommonExercises {
  getAllCommonExercises {
    ...RegularCommonExercise
  }
}
    ${RegularCommonExerciseFragmentDoc}`;

/**
 * __useGetAllCommonExercisesQuery__
 *
 * To run a query within a React component, call `useGetAllCommonExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommonExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommonExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCommonExercisesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCommonExercisesQuery, GetAllCommonExercisesQueryVariables>) {
        return Apollo.useQuery<GetAllCommonExercisesQuery, GetAllCommonExercisesQueryVariables>(GetAllCommonExercisesDocument, baseOptions);
      }
export function useGetAllCommonExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCommonExercisesQuery, GetAllCommonExercisesQueryVariables>) {
          return Apollo.useLazyQuery<GetAllCommonExercisesQuery, GetAllCommonExercisesQueryVariables>(GetAllCommonExercisesDocument, baseOptions);
        }
export type GetAllCommonExercisesQueryHookResult = ReturnType<typeof useGetAllCommonExercisesQuery>;
export type GetAllCommonExercisesLazyQueryHookResult = ReturnType<typeof useGetAllCommonExercisesLazyQuery>;
export type GetAllCommonExercisesQueryResult = Apollo.QueryResult<GetAllCommonExercisesQuery, GetAllCommonExercisesQueryVariables>;
export const GetAllUserWorkoutsDocument = gql`
    query GetAllUserWorkouts {
  getAllUserWorkouts {
    ...RegularWorkout
  }
}
    ${RegularWorkoutFragmentDoc}`;

/**
 * __useGetAllUserWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetAllUserWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserWorkoutsQuery, GetAllUserWorkoutsQueryVariables>) {
        return Apollo.useQuery<GetAllUserWorkoutsQuery, GetAllUserWorkoutsQueryVariables>(GetAllUserWorkoutsDocument, baseOptions);
      }
export function useGetAllUserWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserWorkoutsQuery, GetAllUserWorkoutsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUserWorkoutsQuery, GetAllUserWorkoutsQueryVariables>(GetAllUserWorkoutsDocument, baseOptions);
        }
export type GetAllUserWorkoutsQueryHookResult = ReturnType<typeof useGetAllUserWorkoutsQuery>;
export type GetAllUserWorkoutsLazyQueryHookResult = ReturnType<typeof useGetAllUserWorkoutsLazyQuery>;
export type GetAllUserWorkoutsQueryResult = Apollo.QueryResult<GetAllUserWorkoutsQuery, GetAllUserWorkoutsQueryVariables>;
export const GetDataForMuscleHeatmapDocument = gql`
    query GetDataForMuscleHeatmap($startDate: String!, $endDate: String!) {
  getDataForMuscleHeatmap(startDate: $startDate, endDate: $endDate) {
    primaryMuscles {
      muscleName
      amount
    }
    secondaryMuscles {
      muscleName
      amount
    }
  }
}
    `;

/**
 * __useGetDataForMuscleHeatmapQuery__
 *
 * To run a query within a React component, call `useGetDataForMuscleHeatmapQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataForMuscleHeatmapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataForMuscleHeatmapQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetDataForMuscleHeatmapQuery(baseOptions: Apollo.QueryHookOptions<GetDataForMuscleHeatmapQuery, GetDataForMuscleHeatmapQueryVariables>) {
        return Apollo.useQuery<GetDataForMuscleHeatmapQuery, GetDataForMuscleHeatmapQueryVariables>(GetDataForMuscleHeatmapDocument, baseOptions);
      }
export function useGetDataForMuscleHeatmapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataForMuscleHeatmapQuery, GetDataForMuscleHeatmapQueryVariables>) {
          return Apollo.useLazyQuery<GetDataForMuscleHeatmapQuery, GetDataForMuscleHeatmapQueryVariables>(GetDataForMuscleHeatmapDocument, baseOptions);
        }
export type GetDataForMuscleHeatmapQueryHookResult = ReturnType<typeof useGetDataForMuscleHeatmapQuery>;
export type GetDataForMuscleHeatmapLazyQueryHookResult = ReturnType<typeof useGetDataForMuscleHeatmapLazyQuery>;
export type GetDataForMuscleHeatmapQueryResult = Apollo.QueryResult<GetDataForMuscleHeatmapQuery, GetDataForMuscleHeatmapQueryVariables>;
export const GetExerciseChartDataDocument = gql`
    query GetExerciseChartData($input: GetExerciseChartDataInput!) {
  getExerciseChartData(input: $input) {
    ...RegularGetExerciseChartDataResponse
  }
}
    ${RegularGetExerciseChartDataResponseFragmentDoc}`;

/**
 * __useGetExerciseChartDataQuery__
 *
 * To run a query within a React component, call `useGetExerciseChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseChartDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetExerciseChartDataQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseChartDataQuery, GetExerciseChartDataQueryVariables>) {
        return Apollo.useQuery<GetExerciseChartDataQuery, GetExerciseChartDataQueryVariables>(GetExerciseChartDataDocument, baseOptions);
      }
export function useGetExerciseChartDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseChartDataQuery, GetExerciseChartDataQueryVariables>) {
          return Apollo.useLazyQuery<GetExerciseChartDataQuery, GetExerciseChartDataQueryVariables>(GetExerciseChartDataDocument, baseOptions);
        }
export type GetExerciseChartDataQueryHookResult = ReturnType<typeof useGetExerciseChartDataQuery>;
export type GetExerciseChartDataLazyQueryHookResult = ReturnType<typeof useGetExerciseChartDataLazyQuery>;
export type GetExerciseChartDataQueryResult = Apollo.QueryResult<GetExerciseChartDataQuery, GetExerciseChartDataQueryVariables>;
export const GetExerciseInfoDocument = gql`
    query GetExerciseInfo($exerciseId: String!) {
  getExerciseInfo(exerciseId: $exerciseId) {
    id
    name
    primaryMuscles
    secondaryMuscles
    instructions
    force
    level
    mechanic
    equipment
    category
    isCommonExercise
  }
}
    `;

/**
 * __useGetExerciseInfoQuery__
 *
 * To run a query within a React component, call `useGetExerciseInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseInfoQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useGetExerciseInfoQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseInfoQuery, GetExerciseInfoQueryVariables>) {
        return Apollo.useQuery<GetExerciseInfoQuery, GetExerciseInfoQueryVariables>(GetExerciseInfoDocument, baseOptions);
      }
export function useGetExerciseInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseInfoQuery, GetExerciseInfoQueryVariables>) {
          return Apollo.useLazyQuery<GetExerciseInfoQuery, GetExerciseInfoQueryVariables>(GetExerciseInfoDocument, baseOptions);
        }
export type GetExerciseInfoQueryHookResult = ReturnType<typeof useGetExerciseInfoQuery>;
export type GetExerciseInfoLazyQueryHookResult = ReturnType<typeof useGetExerciseInfoLazyQuery>;
export type GetExerciseInfoQueryResult = Apollo.QueryResult<GetExerciseInfoQuery, GetExerciseInfoQueryVariables>;
export const GetMuscleBarChartDataDocument = gql`
    query GetMuscleBarChartData($input: GetMuscleBarChartDataInput!) {
  getMuscleBarChartData(input: $input) {
    ...RegularGetMuscleBarChartDataResponse
  }
}
    ${RegularGetMuscleBarChartDataResponseFragmentDoc}`;

/**
 * __useGetMuscleBarChartDataQuery__
 *
 * To run a query within a React component, call `useGetMuscleBarChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMuscleBarChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMuscleBarChartDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMuscleBarChartDataQuery(baseOptions: Apollo.QueryHookOptions<GetMuscleBarChartDataQuery, GetMuscleBarChartDataQueryVariables>) {
        return Apollo.useQuery<GetMuscleBarChartDataQuery, GetMuscleBarChartDataQueryVariables>(GetMuscleBarChartDataDocument, baseOptions);
      }
export function useGetMuscleBarChartDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMuscleBarChartDataQuery, GetMuscleBarChartDataQueryVariables>) {
          return Apollo.useLazyQuery<GetMuscleBarChartDataQuery, GetMuscleBarChartDataQueryVariables>(GetMuscleBarChartDataDocument, baseOptions);
        }
export type GetMuscleBarChartDataQueryHookResult = ReturnType<typeof useGetMuscleBarChartDataQuery>;
export type GetMuscleBarChartDataLazyQueryHookResult = ReturnType<typeof useGetMuscleBarChartDataLazyQuery>;
export type GetMuscleBarChartDataQueryResult = Apollo.QueryResult<GetMuscleBarChartDataQuery, GetMuscleBarChartDataQueryVariables>;
export const GetUserLastWorkoutDocument = gql`
    query GetUserLastWorkout {
  getUserLastWorkout {
    ...RegularWorkout
  }
}
    ${RegularWorkoutFragmentDoc}`;

/**
 * __useGetUserLastWorkoutQuery__
 *
 * To run a query within a React component, call `useGetUserLastWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLastWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLastWorkoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserLastWorkoutQuery(baseOptions?: Apollo.QueryHookOptions<GetUserLastWorkoutQuery, GetUserLastWorkoutQueryVariables>) {
        return Apollo.useQuery<GetUserLastWorkoutQuery, GetUserLastWorkoutQueryVariables>(GetUserLastWorkoutDocument, baseOptions);
      }
export function useGetUserLastWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLastWorkoutQuery, GetUserLastWorkoutQueryVariables>) {
          return Apollo.useLazyQuery<GetUserLastWorkoutQuery, GetUserLastWorkoutQueryVariables>(GetUserLastWorkoutDocument, baseOptions);
        }
export type GetUserLastWorkoutQueryHookResult = ReturnType<typeof useGetUserLastWorkoutQuery>;
export type GetUserLastWorkoutLazyQueryHookResult = ReturnType<typeof useGetUserLastWorkoutLazyQuery>;
export type GetUserLastWorkoutQueryResult = Apollo.QueryResult<GetUserLastWorkoutQuery, GetUserLastWorkoutQueryVariables>;
export const GetUserWorkoutDocument = gql`
    query GetUserWorkout($workoutId: String!) {
  getUserWorkout(workoutId: $workoutId) {
    ...RegularWorkout
  }
}
    ${RegularWorkoutFragmentDoc}`;

/**
 * __useGetUserWorkoutQuery__
 *
 * To run a query within a React component, call `useGetUserWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWorkoutQuery({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useGetUserWorkoutQuery(baseOptions: Apollo.QueryHookOptions<GetUserWorkoutQuery, GetUserWorkoutQueryVariables>) {
        return Apollo.useQuery<GetUserWorkoutQuery, GetUserWorkoutQueryVariables>(GetUserWorkoutDocument, baseOptions);
      }
export function useGetUserWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWorkoutQuery, GetUserWorkoutQueryVariables>) {
          return Apollo.useLazyQuery<GetUserWorkoutQuery, GetUserWorkoutQueryVariables>(GetUserWorkoutDocument, baseOptions);
        }
export type GetUserWorkoutQueryHookResult = ReturnType<typeof useGetUserWorkoutQuery>;
export type GetUserWorkoutLazyQueryHookResult = ReturnType<typeof useGetUserWorkoutLazyQuery>;
export type GetUserWorkoutQueryResult = Apollo.QueryResult<GetUserWorkoutQuery, GetUserWorkoutQueryVariables>;
export const GetUserWorkoutsDocument = gql`
    query GetUserWorkouts($startDate: String!, $endDate: String!) {
  getUserWorkouts(startDate: $startDate, endDate: $endDate) {
    ...RegularWorkout
  }
}
    ${RegularWorkoutFragmentDoc}`;

/**
 * __useGetUserWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetUserWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWorkoutsQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetUserWorkoutsQuery(baseOptions: Apollo.QueryHookOptions<GetUserWorkoutsQuery, GetUserWorkoutsQueryVariables>) {
        return Apollo.useQuery<GetUserWorkoutsQuery, GetUserWorkoutsQueryVariables>(GetUserWorkoutsDocument, baseOptions);
      }
export function useGetUserWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWorkoutsQuery, GetUserWorkoutsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserWorkoutsQuery, GetUserWorkoutsQueryVariables>(GetUserWorkoutsDocument, baseOptions);
        }
export type GetUserWorkoutsQueryHookResult = ReturnType<typeof useGetUserWorkoutsQuery>;
export type GetUserWorkoutsLazyQueryHookResult = ReturnType<typeof useGetUserWorkoutsLazyQuery>;
export type GetUserWorkoutsQueryResult = Apollo.QueryResult<GetUserWorkoutsQuery, GetUserWorkoutsQueryVariables>;
export const GetUserYearlyWorkoutDataDocument = gql`
    query GetUserYearlyWorkoutData($startDate: String!, $endDate: String!) {
  getUserYearlyWorkoutData(startDate: $startDate, endDate: $endDate) {
    date
    amount
  }
}
    `;

/**
 * __useGetUserYearlyWorkoutDataQuery__
 *
 * To run a query within a React component, call `useGetUserYearlyWorkoutDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserYearlyWorkoutDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserYearlyWorkoutDataQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetUserYearlyWorkoutDataQuery(baseOptions: Apollo.QueryHookOptions<GetUserYearlyWorkoutDataQuery, GetUserYearlyWorkoutDataQueryVariables>) {
        return Apollo.useQuery<GetUserYearlyWorkoutDataQuery, GetUserYearlyWorkoutDataQueryVariables>(GetUserYearlyWorkoutDataDocument, baseOptions);
      }
export function useGetUserYearlyWorkoutDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserYearlyWorkoutDataQuery, GetUserYearlyWorkoutDataQueryVariables>) {
          return Apollo.useLazyQuery<GetUserYearlyWorkoutDataQuery, GetUserYearlyWorkoutDataQueryVariables>(GetUserYearlyWorkoutDataDocument, baseOptions);
        }
export type GetUserYearlyWorkoutDataQueryHookResult = ReturnType<typeof useGetUserYearlyWorkoutDataQuery>;
export type GetUserYearlyWorkoutDataLazyQueryHookResult = ReturnType<typeof useGetUserYearlyWorkoutDataLazyQuery>;
export type GetUserYearlyWorkoutDataQueryResult = Apollo.QueryResult<GetUserYearlyWorkoutDataQuery, GetUserYearlyWorkoutDataQueryVariables>;
export const GetWeightChartDataDocument = gql`
    query GetWeightChartData($startDate: DateTime!, $endDate: DateTime!) {
  getWeightChartData(startDate: $startDate, endDate: $endDate) {
    date
    weight
    id
  }
}
    `;

/**
 * __useGetWeightChartDataQuery__
 *
 * To run a query within a React component, call `useGetWeightChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeightChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeightChartDataQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetWeightChartDataQuery(baseOptions: Apollo.QueryHookOptions<GetWeightChartDataQuery, GetWeightChartDataQueryVariables>) {
        return Apollo.useQuery<GetWeightChartDataQuery, GetWeightChartDataQueryVariables>(GetWeightChartDataDocument, baseOptions);
      }
export function useGetWeightChartDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeightChartDataQuery, GetWeightChartDataQueryVariables>) {
          return Apollo.useLazyQuery<GetWeightChartDataQuery, GetWeightChartDataQueryVariables>(GetWeightChartDataDocument, baseOptions);
        }
export type GetWeightChartDataQueryHookResult = ReturnType<typeof useGetWeightChartDataQuery>;
export type GetWeightChartDataLazyQueryHookResult = ReturnType<typeof useGetWeightChartDataLazyQuery>;
export type GetWeightChartDataQueryResult = Apollo.QueryResult<GetWeightChartDataQuery, GetWeightChartDataQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;