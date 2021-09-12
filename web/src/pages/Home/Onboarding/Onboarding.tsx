import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as FemaleAvatar } from "../../../assets/svg/female.svg";
import { ReactComponent as GreenCheckmark } from "../../../assets/svg/green-checkmark.svg";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as MaleAvatar } from "../../../assets/svg/male.svg";
import { ReactComponent as QuestionMark } from "../../../assets/svg/question-mark.svg";
import { Heading } from "../../../components/UI";
import * as ROUTES from "../../../constants/routes";
import {
  BulletLi,
  ButtonWrapper,
  CardContent,
  CardWrapper,
  ChooseOption,
  GoBack,
  LogoContainer,
  NavWrapper,
  NextButton,
  Option,
  PrevButton,
  Progress,
  ProgressBar,
  Text,
  Wrapper,
} from "./styles";

interface OnboardingProps {}

const ALL_STEPS = 4;

enum STEP_TYPES {
  GENDER = 1,
  ACTIVITY_LEVEL = 2,
  WIEGHT_GOAL = 3,
  GENERAL_INFO = 4,
}

const Onboarding: React.FC<OnboardingProps> = () => {
  const [step, setStep] = useState<STEP_TYPES>(STEP_TYPES.ACTIVITY_LEVEL);
  const [userChoices, setUserChoices] = useState({
    gender: "",
    activityLevel: "",
  });

  console.log({ userChoices });

  const calculateProgress = (step: number, maxSteps: number) => {
    return `${(step / maxSteps) * 100}%`;
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
                  onClick={() => setStep(STEP_TYPES.ACTIVITY_LEVEL)}
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
                <PrevButton onClick={() => setStep(STEP_TYPES.GENDER)}>
                  Back
                </PrevButton>
                <NextButton
                  onClick={() => setStep(STEP_TYPES.WIEGHT_GOAL)}
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
              <ButtonWrapper>
                <PrevButton onClick={() => setStep(STEP_TYPES.ACTIVITY_LEVEL)}>
                  Back
                </PrevButton>
                <NextButton onClick={() => setStep(STEP_TYPES.GENERAL_INFO)}>
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
            <ButtonWrapper>
              <PrevButton onClick={() => setStep(STEP_TYPES.WIEGHT_GOAL)}>
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
