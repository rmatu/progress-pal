import moment from "moment";
import React from "react";
import Model from "react-body-highlighter";
import { useHistory } from "react-router";
import { ReactComponent as TrashIcon } from "../../../../assets/svg/trash.svg";
import { ReactComponent as WeightIcon } from "../../../../assets/svg/weight.svg";
import { ReactComponent as TimerIcon } from "../../../../assets/svg/timer.svg";
import { ReactComponent as ExerciseIcon } from "../../../../assets/svg/exercise.svg";
import { WORKOUTS } from "../../../../constants/routes";
import {
  useDeleteWorkoutMutation,
  Workout,
} from "../../../../generated/graphql";
import {
  calculateVolume,
  getExercisesAmountString,
  getMusclesFromWorkout,
  getThemostTraineMuscleAmountFromWorkout,
  getTimeBetweenTwoDates,
} from "../../../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../../../utils/cssHelpers";
import { createRefetchQueriesArray } from "../../../../utils/graphQLHelpers";
import { gramsToKilograms } from "../../../../utils/numberUtils";
import {
  ExerciseSVG,
  ContentWrapper,
  LeftCardContent,
  QuickInfoRow,
  RightCardContent,
  SVGWrapper,
  TrashIconWrapper,
  WorkoutCardWrapper,
  WorkoutDate,
  WorkoutName,
} from "./styles";
import Loader from "../../Loader/Loader";
import { Heading } from "../..";

interface WorkoutCardProps {
  workout: Workout | undefined;
  dashboardLayout?: boolean;
  setPopup?: React.Dispatch<
    React.SetStateAction<{
      showPopup: boolean;
      text: string;
    }>
  >;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  dashboardLayout,
  workout,
  setPopup,
}) => {
  const [deleteWorkout] = useDeleteWorkoutMutation({
    refetchQueries: createRefetchQueriesArray([
      "getDataForMuscleHeatmap",
      "getUserWorkouts",
      "getUserYearlyWorkout",
      "getUserLastWorkout",
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

  if (!workout) {
    return (
      <WorkoutCardWrapper dashboardLayout={dashboardLayout} loader>
        <Loader />
      </WorkoutCardWrapper>
    );
  }

  return (
    <WorkoutCardWrapper
      onClick={handleSelectWorkout}
      dashboardLayout={dashboardLayout}
    >
      {dashboardLayout && (
        <Heading size="h3" marginB="0.4em">
          Latest training
        </Heading>
      )}
      <ContentWrapper>
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
          <QuickInfoRow>
            <SVGWrapper>
              <ExerciseIcon />
              {getExercisesAmountString(workout)}
            </SVGWrapper>
          </QuickInfoRow>
        </LeftCardContent>
        <RightCardContent>
          <ExerciseSVG dashboardLayout={dashboardLayout}>
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
      </ContentWrapper>
      {!dashboardLayout && (
        <TrashIconWrapper>
          <TrashIcon onClick={handleDeleteWorkout} />
        </TrashIconWrapper>
      )}
    </WorkoutCardWrapper>
  );
};
export default WorkoutCard;
