import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ExerciseSetsFromDB from "../../../components/ExerciseSetsFromDB/ExerciseSetsFromDB";
import { Button, Heading, Modal } from "../../../components/UI";
import Loader from "../../../components/UI/Loader/Loader";
import Popup from "../../../components/UI/Popup/Popup";
import {
  GetUserWorkoutQuery,
  useDeleteWorkoutExerciseMutation,
  useGetUserWorkoutLazyQuery,
  useMeQuery,
  WorkoutExercise,
} from "../../../generated/graphql";
import DashbordLayoutHOC from "../../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../../hoc/styles";
import * as navActions from "../../../redux/dashboardNavbar/dashboardNavbarActions";
import * as modalActions from "../../../redux/modal/modalActions";
import * as popupActions from "../../../redux/popup/popupActions";
import { AppState } from "../../../redux/rootReducer";
import { createRefetchQueriesArray } from "../../../utils/graphQLHelpers";
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
//   -> Send only updated and new sets to the backend

const Workout: React.FC<WorkoutProps> = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user } = useMeQuery();
  const [getWorkout, { data: workoutData }] = useGetUserWorkoutLazyQuery();

  const { show, text, popupType } = useSelector(
    (state: AppState) => state.popup,
  );
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const [fetchedWorkout, setFetchedWorkout] = useState<GetUserWorkoutQuery>();

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
            />
          ))}
        </ContentWrapper>
      </RightContent>
      <Popup showPopup={show} error={popupType === "error"}>
        {text}
      </Popup>
    </DashbordLayoutHOC>
  );
};
export default Workout;
