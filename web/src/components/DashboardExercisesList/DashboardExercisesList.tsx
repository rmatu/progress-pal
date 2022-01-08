import moment from "moment";
import React, { useEffect } from "react";
import { useGetUserWorkoutsLazyQuery, Workout } from "../../generated/graphql";
import {
  calculateVolume,
  getExercisesAmountString,
  getTimeBetweenTwoDates,
} from "../../utils/converters";
import { gramsToKilograms } from "../../utils/numberUtils";
import { Heading } from "../UI";
import { ReactComponent as WeightIcon } from "../../assets/svg/weight.svg";
import { ReactComponent as TimerIcon } from "../../assets/svg/timer.svg";
import { ReactComponent as ExerciseIcon } from "../../assets/svg/exercise.svg";
import Loader from "../UI/Loader/Loader";
import { WorkoutDate } from "../UI/WorkoutsList/WorkoutCard/styles";
import {
  FirstColum,
  LoaderWrapper,
  QuickInfoRow,
  SVGWrapper,
  WorkoutWrapper,
  Wrapper,
} from "./styles";
import { useHistory } from "react-router-dom";
import { WORKOUTS } from "../../constants/routes";

interface DashboardExercisesListProps {}

const DashboardExercisesList: React.FC<DashboardExercisesListProps> = ({}) => {
  const [getUserWorkouts, { data: workoutsData, loading: workoutsLoading }] =
    useGetUserWorkoutsLazyQuery();

  const workouts = workoutsData?.getUserWorkouts?.slice(0, 7);

  const history = useHistory();

  const handleRedirect = (id: string) => {
    history.push(`${WORKOUTS}/${id}`);
  };

  useEffect(() => {
    getUserWorkouts({
      variables: {
        startDate: "2020-11-21T20:25:32.000Z",
        endDate: "2022-11-21T20:25:32.000Z",
      },
    });
  }, []);

  if (workoutsLoading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {workouts?.map(el => (
        <WorkoutWrapper
          key={el.id}
          onClick={() => {
            handleRedirect(el.id);
          }}
        >
          <FirstColum>
            <Heading size="h4" textAlign="left" padding="0">
              {el.name}
            </Heading>
            <WorkoutDate>
              {moment(el.createdAt, "x").format("DD MMMM - HH:mm")}
            </WorkoutDate>
          </FirstColum>
          <QuickInfoRow>
            <SVGWrapper>
              <WeightIcon />
              {gramsToKilograms(calculateVolume(el as Workout))} kg
            </SVGWrapper>
          </QuickInfoRow>
          <QuickInfoRow>
            <SVGWrapper>
              <TimerIcon />
              {getTimeBetweenTwoDates(el?.startTime, el?.endTime)}
            </SVGWrapper>
          </QuickInfoRow>
          <QuickInfoRow>
            <SVGWrapper>
              <ExerciseIcon />
              {getExercisesAmountString(el as Workout)}
            </SVGWrapper>
          </QuickInfoRow>
        </WorkoutWrapper>
      ))}
    </Wrapper>
  );
};
export default DashboardExercisesList;
