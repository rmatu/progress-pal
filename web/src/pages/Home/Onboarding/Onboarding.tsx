import { Field, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Balance } from "../../../assets/svg/balance.svg";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as Decrease } from "../../../assets/svg/decrease.svg";
import { ReactComponent as FemaleAvatar } from "../../../assets/svg/female.svg";
import { ReactComponent as GreenCheckmark } from "../../../assets/svg/green-checkmark.svg";
import { ReactComponent as Increase } from "../../../assets/svg/increase.svg";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as MaleAvatar } from "../../../assets/svg/male.svg";
import { ReactComponent as QuestionMark } from "../../../assets/svg/question-mark.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import { Heading, Input } from "../../../components/UI";
import Calendar from "../../../components/UI/Date/Calendar/Calendar";
import * as ROUTES from "../../../constants/routes";
import {
  GeneralInfoInitialValues,
  GeneralInfoSchema,
} from "../../../utils/formSchemas";
import {
  BulletLi,
  ButtonWrapper,
  CardContent,
  CardWrapper,
  ChooseOption,
  Form,
  GoBack,
  LogoContainer,
  NavWrapper,
  NextButton,
  Flex,
  Option,
  PrevButton,
  Progress,
  ProgressBar,
  Text,
  Wrapper,
  Row,
} from "./styles";

interface OnboardingProps {}

const ALL_STEPS = 4;

enum STEP_TYPES {
  GENDER = 1,
  WIEGHT_GOAL = 2,
  ACTIVITY_LEVEL = 3,
  GENERAL_INFO = 4,
}

type UserChoices = {
  gender: null | string;
  activityLevel: null | string;
  weightGoal: null | string;
};

const Onboarding: React.FC<OnboardingProps> = () => {
  const [step, setStep] = useState<STEP_TYPES>(STEP_TYPES.GENERAL_INFO);
  const [bornDate, setBornDate] = useState<Date>(moment().toDate());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [userChoices, setUserChoices] = useState<UserChoices>({
    gender: null,
    activityLevel: null,
    weightGoal: null,
  });

  const calculateProgress = (step: number, maxSteps: number) => {
    return `${(step / maxSteps) * 100}%`;
  };

  const handleChange = (
    e: any,
    fieldName: string,
    formikValue: string,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => {
    if (fieldName === "birthDate") {
      let updatedValue = e.target.value;

      //User is deleting
      if (updatedValue.length <= formikValue.length) {
        setFieldValue(fieldName, updatedValue, true);
        return;
      }

      // not a number
      const lastChar = updatedValue.charCodeAt(updatedValue.length - 1);
      console.log({ lastChar });
      if (lastChar < 48 || lastChar > 57) {
        return;
      }

      setFieldValue(fieldName, updatedValue, true);
      if (updatedValue.length === 2 || updatedValue.length === 5) {
        setFieldValue(fieldName, `${updatedValue}/`, true);
      }
    }
  };

  if (step === STEP_TYPES.GENDER) {
    return (
      <>
        <NavWrapper>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <NavLink to={ROUTES.LANDING_PAGE}>
            <GoBack>
              <Cancel />
            </GoBack>
          </NavLink>
        </NavWrapper>

        <Wrapper>
          <CardWrapper>
            <Progress>
              <ProgressBar progressWidth={calculateProgress(step, ALL_STEPS)} />
            </Progress>
            <CardContent>
              <Heading size="h2">What is your biological sex?</Heading>
              <ChooseOption>
                <Option
                  selected={userChoices.gender === "female"}
                  onClick={() =>
                    setUserChoices(prev => ({ ...prev, gender: "female" }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <FemaleAvatar />
                  <Text margin="0.5em 0 0 0">Female</Text>
                </Option>
                <Option
                  selected={userChoices.gender === "male"}
                  onClick={() =>
                    setUserChoices(prev => ({ ...prev, gender: "male" }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <MaleAvatar />
                  <Text margin="0.5em 0 0 0">Male</Text>
                </Option>
                <Option
                  selected={userChoices.gender === "other"}
                  onClick={() =>
                    setUserChoices(prev => ({ ...prev, gender: "other" }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <QuestionMark />
                  <Text margin="0.5em 0 0 0">Other</Text>
                </Option>
              </ChooseOption>
              <ButtonWrapper>
                <PrevButton disabled>Back</PrevButton>
                <NextButton
                  onClick={() => setStep(STEP_TYPES.WIEGHT_GOAL)}
                  disabled={!userChoices.gender}
                >
                  Next
                </NextButton>
              </ButtonWrapper>
            </CardContent>
          </CardWrapper>
        </Wrapper>
      </>
    );
  }

  if (step === STEP_TYPES.WIEGHT_GOAL) {
    return (
      <>
        <NavWrapper>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <NavLink to={ROUTES.LANDING_PAGE}>
            <GoBack>
              <Cancel />
            </GoBack>
          </NavLink>
        </NavWrapper>
        <Wrapper>
          <CardWrapper>
            <Progress>
              <ProgressBar progressWidth={calculateProgress(step, ALL_STEPS)} />
            </Progress>
            <CardContent>
              <Heading size="h2">What's your weight goal?</Heading>
              <ChooseOption>
                <Option
                  selected={userChoices.weightGoal === "loseWeight"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      weightGoal: "loseWeight",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Decrease />
                  <Text margin="0.5em 0 0 0">Lose Weight</Text>
                </Option>
                <Option
                  selected={userChoices.weightGoal === "gainWeight"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      weightGoal: "gainWeight",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Increase />
                  <Text margin="0.5em 0 0 0">Gain Weight</Text>
                </Option>
                <Option
                  selected={userChoices.weightGoal === "maintainWeight"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      weightGoal: "maintainWeight",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Balance />
                  <Text margin="0.5em 0 0 0">Maintain Weight</Text>
                </Option>
              </ChooseOption>
              <ButtonWrapper>
                <PrevButton onClick={() => setStep(STEP_TYPES.GENDER)}>
                  Back
                </PrevButton>
                <NextButton
                  onClick={() => setStep(STEP_TYPES.ACTIVITY_LEVEL)}
                  disabled={!userChoices.weightGoal}
                >
                  Next
                </NextButton>
              </ButtonWrapper>
            </CardContent>
          </CardWrapper>
        </Wrapper>
      </>
    );
  }

  if (step === STEP_TYPES.ACTIVITY_LEVEL) {
    return (
      <>
        <NavWrapper>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <NavLink to={ROUTES.LANDING_PAGE}>
            <GoBack>
              <Cancel />
            </GoBack>
          </NavLink>
        </NavWrapper>
        <Wrapper>
          <CardWrapper margin="2em 0">
            <Progress>
              <ProgressBar progressWidth={calculateProgress(step, ALL_STEPS)} />
            </Progress>
            <CardContent>
              <Heading size="h2">What is you physical activity level?</Heading>
              <ChooseOption flexDirection="column">
                <Option
                  rowStyling
                  selected={userChoices.activityLevel === "sedentary"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      activityLevel: "sedentary",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Heading size="h4">Sedentary</Heading>
                  <BulletLi>
                    A person that spends most of the day sitting or lying.
                  </BulletLi>
                  <BulletLi>
                    Example jobs: receptionist, surveillance systems monitor,
                    programmer.
                  </BulletLi>
                </Option>
                <Option
                  rowStyling
                  selected={userChoices.activityLevel === "lightlyActive"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      activityLevel: "lightlyActive",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Heading size="h4">Lighty Active</Heading>
                  <BulletLi>
                    A person that spends a good amount of time standing/walking.
                  </BulletLi>
                  <BulletLi>
                    Example jobs: security guard, teacher, cashier.
                  </BulletLi>
                </Option>
                <Option
                  rowStyling
                  selected={userChoices.activityLevel === "active"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      activityLevel: "active",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Heading size="h4">Active</Heading>
                  <BulletLi>
                    A person that spends a good amount of time doing some
                    physical activity.
                  </BulletLi>
                  <BulletLi>
                    Example jobs: plumber, paramedic, postal carrier.
                  </BulletLi>
                </Option>
                <Option
                  rowStyling
                  selected={userChoices.activityLevel === "veryActive"}
                  onClick={() =>
                    setUserChoices(prev => ({
                      ...prev,
                      activityLevel: "veryActive",
                    }))
                  }
                >
                  <GreenCheckmark id="checkmark" />
                  <Heading size="h4">Very Active</Heading>
                  <BulletLi>
                    A person that spends most of the time doing heavy physical
                    activities.
                  </BulletLi>
                  <BulletLi>
                    Example jobs: football player, volleyball player, strongman
                  </BulletLi>
                </Option>
              </ChooseOption>
              <ButtonWrapper>
                <PrevButton onClick={() => setStep(STEP_TYPES.WIEGHT_GOAL)}>
                  Back
                </PrevButton>
                <NextButton
                  onClick={() => setStep(STEP_TYPES.GENERAL_INFO)}
                  disabled={!userChoices.activityLevel}
                >
                  Next
                </NextButton>
              </ButtonWrapper>
            </CardContent>
          </CardWrapper>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <NavWrapper>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <NavLink to={ROUTES.LANDING_PAGE}>
          <GoBack>
            <Cancel />
          </GoBack>
        </NavLink>
      </NavWrapper>
      <Wrapper>
        <CardWrapper>
          <Progress>
            <ProgressBar progressWidth={calculateProgress(step, ALL_STEPS)} />
          </Progress>
          <CardContent>
            <Heading size="h2">General Info</Heading>
            <Form>
              <Formik
                initialValues={GeneralInfoInitialValues}
                validationSchema={GeneralInfoSchema}
                onSubmit={({}) => {}}
              >
                {({ setFieldValue, values }) => (
                  <>
                    {console.log({ values })}
                    <Flex flexDirection="row">
                      <Row>
                        <Heading size="h4" marginB="0.5em">
                          Height
                        </Heading>
                        <Field
                          type="number"
                          name="height"
                          placeholder="in cm"
                          width="15em"
                          min={100}
                          max={300}
                          component={Input}
                        />
                      </Row>
                      <Row>
                        <Heading size="h4" marginB="0.5em">
                          Wieght
                        </Heading>
                        <Field
                          type="number"
                          name="weight"
                          placeholder="in kg"
                          width="15em"
                          min={25}
                          max={635}
                          component={Input}
                        />
                      </Row>
                    </Flex>
                    <Row>
                      <Heading size="h4" marginB="0.5em" textAlign="left">
                        Birth Date
                      </Heading>
                      <Field
                        type="text"
                        name="birthDate"
                        placeholder="dd/mm/yyyy"
                        width="15em"
                        maxLength={10}
                        component={Input}
                        onChange={(e: React.ChangeEvent<any>) => {
                          handleChange(
                            e,
                            "birthDate",
                            values.birthDate,
                            setFieldValue,
                          );
                        }}
                      >
                        <CalendarIcon
                          onClick={() => setShowCalendar(prev => !prev)}
                        />
                      </Field>
                    </Row>
                    {showCalendar && (
                      <Calendar
                        position={"absolute"}
                        selectedDate={bornDate}
                        changeDate={setBornDate}
                        handleClose={() => setShowCalendar(false)}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </>
                )}
              </Formik>
            </Form>
            <ButtonWrapper>
              <PrevButton onClick={() => setStep(STEP_TYPES.ACTIVITY_LEVEL)}>
                Back
              </PrevButton>
              <NextButton>Next</NextButton>
            </ButtonWrapper>
          </CardContent>
        </CardWrapper>
      </Wrapper>
    </>
  );
};

export default Onboarding;
