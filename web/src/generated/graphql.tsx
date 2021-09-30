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
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUserMetrics?: Maybe<Array<UserMetrics>>;
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

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

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