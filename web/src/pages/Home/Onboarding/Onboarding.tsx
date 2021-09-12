import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as MaleAvatar } from "../../../assets/svg/male.svg";
import { ReactComponent as FemaleAvatar } from "../../../assets/svg/female.svg";
import { ReactComponent as GreenCheckmark } from "../../../assets/svg/green-checkmark.svg";
import { ReactComponent as QuestionMark } from "../../../assets/svg/question-mark.svg";
import { Heading } from "../../../components/UI";
import * as ROUTES from "../../../constants/routes";
import { GoBack, LogoContainer } from "../../Auth/VerifyEmail/styles";
import {
  ButtonWrapper,
  CardContent,
  CardWrapper,
  ChooseOption,
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
  const [step, setStep] = useState<STEP_TYPES>(STEP_TYPES.GENDER);
  const [userChoices, setUserChoices] = useState({
    gender: "",
  });

  const calculateProgress = (step: number, maxSteps: number) => {
    return `${(step / maxSteps) * 100}%`;
  };

  if (step === STEP_TYPES.GENDER) {
    return (
      <>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <NavLink to={ROUTES.LANDING_PAGE}>
          <GoBack>
            <Cancel />
          </GoBack>
        </NavLink>
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
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <NavLink to={ROUTES.LANDING_PAGE}>
          <GoBack>
            <Cancel />
          </GoBack>
        </NavLink>
        <Wrapper>
          <CardWrapper>
            <Progress>
              <ProgressBar progressWidth={calculateProgress(step, ALL_STEPS)} />
            </Progress>
            <CardContent>
              <Heading size="h2">Tell us something about you</Heading>
              <ButtonWrapper>
                <PrevButton onClick={() => setStep(STEP_TYPES.GENDER)}>
                  Back
                </PrevButton>
                <NextButton onClick={() => setStep(STEP_TYPES.WIEGHT_GOAL)}>
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
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <NavLink to={ROUTES.LANDING_PAGE}>
          <GoBack>
            <Cancel />
          </GoBack>
        </NavLink>
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
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavLink to={ROUTES.LANDING_PAGE}>
        <GoBack>
          <Cancel />
        </GoBack>
      </NavLink>
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
