import React from "react";
import { Heading } from "..";
import { WorkoutExercise } from "../../../generated/graphql";
import { convertMusclesToSVGNames } from "../../../utils/converters";
import { ReactComponent as HumanFrontSVG } from "../../../assets/svg/humanFront.svg";
import { ReactComponent as HumanBackSVG } from "../../../assets/svg/humanBack.svg";
import ModalScroll from "../ModalScroll/ModalScroll";
import {
  Grid,
  GridItem,
  GridValue,
  Instruction,
  Instructions,
  ExerciseSVG,
  Row,
} from "./styles";
import { IExercise } from "../../../constants/exercises";

interface ExerciseInstructionModalProps {
  opened: boolean;
  close: () => void;
  exercise?: WorkoutExercise;
  exactExercise?: IExercise;
}

const ExerciseInstructionModal: React.FC<ExerciseInstructionModalProps> = ({
  opened,
  exercise,
  exactExercise,
  close,
}) => {
  const exerciseInfo1 = exercise?.userExercise || exercise?.commonExercise;
  const exerciseInfo2 = exactExercise;
  const exerciseInfo = exerciseInfo1 || exerciseInfo2;

  console.log(exerciseInfo);

  return (
    <ModalScroll show={opened} handleClose={close}>
      <Heading size="h2" marginB="0.6em">
        {exerciseInfo?.name}
      </Heading>
      <Row>
        <Grid>
          <GridItem>
            <Heading size="h4" textAlign="left" padding="0">
              Level:
            </Heading>
            <GridValue>{exerciseInfo?.level}</GridValue>
          </GridItem>
          <GridItem>
            <Heading size="h4" textAlign="left" padding="0">
              Category:
            </Heading>
            <GridValue>{exerciseInfo?.category}</GridValue>
          </GridItem>
          {exerciseInfo?.force && (
            <GridItem>
              <Heading size="h4" textAlign="left" padding="0">
                Force:
              </Heading>
              <GridValue>{exerciseInfo?.force}</GridValue>
            </GridItem>
          )}
          {exerciseInfo?.mechanic && (
            <GridItem>
              <Heading size="h4" textAlign="left" padding="0">
                Mechanic:
              </Heading>
              <GridValue>{exerciseInfo.mechanic}</GridValue>
            </GridItem>
          )}
          {exerciseInfo?.equipment && (
            <GridItem>
              <Heading size="h4" textAlign="left" padding="0">
                Equipment:
              </Heading>
              <GridValue>{exerciseInfo.equipment}</GridValue>
            </GridItem>
          )}
        </Grid>
        <ExerciseSVG
          muscles={convertMusclesToSVGNames(
            exerciseInfo?.primaryMuscles as string[],
          )}
          secondaryMuscles={convertMusclesToSVGNames(
            exerciseInfo?.secondaryMuscles as string[],
          )}
          mobileCenter
        >
          <HumanFrontSVG />
          <HumanBackSVG />
        </ExerciseSVG>
      </Row>
      <Heading size="h4" textAlign="left" padding="0">
        Instructions
      </Heading>
      <Instructions>
        {exerciseInfo?.instructions.map(info => (
          <Instruction key={info}>{info}</Instruction>
        ))}
      </Instructions>
    </ModalScroll>
  );
};
export default ExerciseInstructionModal;
