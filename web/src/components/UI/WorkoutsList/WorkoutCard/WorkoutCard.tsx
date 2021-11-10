import moment from "moment";
import React from "react";
import Model from "react-body-highlighter";
import { ReactComponent as TrashIcon } from "../../../../assets/svg/trash.svg";
import { ReactComponent as WeightIcon } from "../../../../assets/svg/weight.svg";
import { Workout } from "../../../../generated/graphql";
import {
  calculateVolume,
  getMusclesFromWorkout,
  getThemostTraineMuscleAmountFromWorkout,
} from "../../../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../../../utils/cssHelpers";
import {
  ExerciseSVG,
  LeftCardContent,
  QuickInfoRow,
  RightCardContent,
  SVGWrapper,
  TrashIconWrapper,
  WorkoutCardWrapper,
  WorkoutDate,
  WorkoutName,
} from "./styles";

interface WorkoutCardProps {
  workout: Workout | undefined;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <WorkoutCardWrapper>
      <LeftCardContent>
        <WorkoutName>{workout?.name}</WorkoutName>
        <WorkoutDate>
          {moment(workout?.updatedAt, "x").format("DD MMMM - HH:MM")}
        </WorkoutDate>
        <QuickInfoRow>
          <SVGWrapper>
            <WeightIcon />
            {calculateVolume(workout as Workout)} kg
          </SVGWrapper>
        </QuickInfoRow>
      </LeftCardContent>
      <RightCardContent>
        <ExerciseSVG>
          <Model
            highlightedColors={[
              ...populateColorsForMuscleHeatmap(
                getThemostTraineMuscleAmountFromWorkout(workout as Workout),
                299,
                180,
                180,
                8,
              ),
            ]}
            data={[
              {
                name: "",
                //@ts-ignore
                muscles: getMusclesFromWorkout(workout as Workout),
              },
            ]}
          />

          <Model
            type="posterior"
            highlightedColors={[
              ...populateColorsForMuscleHeatmap(
                getThemostTraineMuscleAmountFromWorkout(workout as Workout),
                299,
                180,
                180,
                8,
              ),
            ]}
            data={[
              {
                name: "",
                //@ts-ignore
                muscles: getMusclesFromWorkout(workout as Workout),
              },
            ]}
          />
        </ExerciseSVG>
      </RightCardContent>
      <TrashIconWrapper>
        <TrashIcon />
      </TrashIconWrapper>
    </WorkoutCardWrapper>
  );
};
export default WorkoutCard;
