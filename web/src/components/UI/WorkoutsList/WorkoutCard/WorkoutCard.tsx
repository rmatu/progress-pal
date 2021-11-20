import moment from "moment";
import React from "react";
import Model from "react-body-highlighter";
import { useHistory } from "react-router";
import { ReactComponent as TrashIcon } from "../../../../assets/svg/trash.svg";
import { ReactComponent as WeightIcon } from "../../../../assets/svg/weight.svg";
import { ReactComponent as TimerIcon } from "../../../../assets/svg/timer.svg";
import { WORKOUTS } from "../../../../constants/routes";
import {
  useDeleteWorkoutMutation,
  Workout,
} from "../../../../generated/graphql";
import {
  calculateVolume,
  getMusclesFromWorkout,
  getThemostTraineMuscleAmountFromWorkout,
  getTimeBetweenTwoDates,
} from "../../../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../../../utils/cssHelpers";
import { createRefetchQueriesArray } from "../../../../utils/graphQLHelpers";
import { gramsToKilograms } from "../../../../utils/numberUtils";
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
  setPopup?: React.Dispatch<
    React.SetStateAction<{
      showPopup: boolean;
      text: string;
    }>
  >;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, setPopup }) => {
  const [deleteWorkout] = useDeleteWorkoutMutation({
    refetchQueries: createRefetchQueriesArray([
      "getDataForMuscleHeatmap",
      "getUserWorkouts",
      "getUserYearlyWorkout",
    ]),
    onCompleted: () => {
      if (setPopup) {
        setPopup({
          showPopup: true,
          text: "Your workout has been deleted successfuly!",
        });
        setTimeout(() => {
          setPopup({
            showPopup: false,
            text: "Your workout has been deleted successfuly!",
          });
        }, 4000);
      }
    },
  });

  const history = useHistory();

  const handleSelectWorkout = () => {
    if (!workout) return;

    history.push(`${WORKOUTS}/${workout.id}`);
  };

  const handleDeleteWorkout = (e: any) => {
    e.stopPropagation();
    if (!workout) return;

    deleteWorkout({
      variables: {
        workoutId: workout.id,
      },
    });
  };

  getTimeBetweenTwoDates(workout?.startTime, workout?.endTime);

  return (
    <WorkoutCardWrapper onClick={handleSelectWorkout}>
      <LeftCardContent>
        <WorkoutName>{workout?.name}</WorkoutName>
        <WorkoutDate>
          {moment(workout?.createdAt, "x").format("DD MMMM - HH:mm")}
        </WorkoutDate>
        <QuickInfoRow>
          <SVGWrapper>
            <WeightIcon />
            {gramsToKilograms(calculateVolume(workout as Workout))} kg
          </SVGWrapper>
        </QuickInfoRow>
        <QuickInfoRow>
          <SVGWrapper>
            <TimerIcon />
            {getTimeBetweenTwoDates(workout?.startTime, workout?.endTime)}
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
        <TrashIcon onClick={handleDeleteWorkout} />
      </TrashIconWrapper>
    </WorkoutCardWrapper>
  );
};
export default WorkoutCard;
