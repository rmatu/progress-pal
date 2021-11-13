import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ExerciseSetsFromDB from "../../../components/ExerciseSetsFromDB/ExerciseSetsFromDB";
import { Heading } from "../../../components/UI";
import Loader from "../../../components/UI/Loader/Loader";
import {
  GetUserWorkoutQuery,
  useGetUserWorkoutLazyQuery,
  useMeQuery,
  WorkoutExercise,
} from "../../../generated/graphql";
import DashbordLayoutHOC from "../../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../../hoc/styles";
import * as navActions from "../../../redux/dashboardNavbar/dashboardNavbarActions";
import { AppState } from "../../../redux/rootReducer";
import {
  ContentWrapper,
  Date,
  WorkoutHeadingWrapper,
  WorkoutHeading,
} from "./styles";

interface WorkoutProps {}

// How do I handle updating workout on DOM and on the backend:
// DOM:
//   -> I store the workoutData in fetchedWorkout variable
//   -> Use setFetchedWorkout to update the DOM
//   -> On each update pass that updated set to the setArray
// Backend:
//   -> Send only updated stuff to the backend

const Workout: React.FC<WorkoutProps> = () => {
  const { data: user } = useMeQuery();
  const [getWorkout, { data: workoutData }] = useGetUserWorkoutLazyQuery();

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);
  const { id } = useParams<{ id: string }>();

  const [fetchedWorkout, setFetchedWorkout] = useState<GetUserWorkoutQuery>();

  console.log({ fetchedWorkout }, "All data from the backend");

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getWorkout({
        variables: {
          workoutId: id,
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (!workoutData) return;

    setFetchedWorkout(workoutData);
  }, [workoutData]);

  useEffect(() => {
    dispatch(navActions.changeItem(""));
  }, []);

  if (!fetchedWorkout) {
    return (
      <DashbordLayoutHOC user={user?.me}>
        <RightContent open={open}>
          <Loader layoutLoaderUI />
        </RightContent>
      </DashbordLayoutHOC>
    );
  }

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
        <ContentWrapper>
          <Heading size="h2" textAlign="left" padding="0">
            {fetchedWorkout?.getUserWorkout?.name}{" "}
          </Heading>
          <Date>
            {moment(fetchedWorkout?.getUserWorkout?.updatedAt, "x").format(
              "DD MMMM YYYY - HH:MM",
            )}
          </Date>

          <WorkoutHeadingWrapper margin="2em 0">
            <WorkoutHeading>Exercises</WorkoutHeading>
          </WorkoutHeadingWrapper>

          {fetchedWorkout?.getUserWorkout?.workoutExercise.map(exercise => (
            <ExerciseSetsFromDB
              key={exercise.id}
              exercise={exercise as WorkoutExercise}
              fetchedWorkout={fetchedWorkout}
              setFetchedWorkout={setFetchedWorkout}
            />
          ))}
        </ContentWrapper>
      </RightContent>
    </DashbordLayoutHOC>
  );
};
export default Workout;
