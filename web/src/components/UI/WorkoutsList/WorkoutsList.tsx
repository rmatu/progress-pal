import moment from "moment";
import React from "react";
import { GetUserWorkoutsQuery, Workout } from "../../../generated/graphql";
import { AMOUNT_WORKOUTS_TO_ADD } from "../../../pages/Workouts/Workouts";
import { convertDataForMuscleHeatmap } from "../../../utils/converters";
import { isNewMonthTimeStamp } from "../../../utils/dateHelpers";
import {
  MonthAndYear,
  MonthAndYearWrapper,
  NoWorkoutsText,
  WorkoutsWrapper,
  WorkoutWrapper,
} from "./styles";
import WorkoutCard from "./WorkoutCard/WorkoutCard";

interface WorkoutsListProps {
  workoutsData: GetUserWorkoutsQuery["getUserWorkouts"] | undefined;
  startSlice: number;
  endSlice: number;
  setEndSlice: React.Dispatch<React.SetStateAction<number>>;
  setPopup?: React.Dispatch<
    React.SetStateAction<{
      showPopup: boolean;
      text: string;
    }>
  >;
}

const WorkoutsList: React.FC<WorkoutsListProps> = ({
  workoutsData,
  startSlice,
  endSlice,
  setEndSlice,
  setPopup,
}) => {
  const handleScroll = (e: any) => {
    const top = e.target.scrollTop === 0;

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      setEndSlice(prev => prev + AMOUNT_WORKOUTS_TO_ADD);
    }
  };

  return (
    <WorkoutsWrapper onScroll={handleScroll}>
      {workoutsData?.slice(startSlice, endSlice).map((el, idx) => (
        <React.Fragment key={el.id}>
          {idx === 0 ? (
            <MonthAndYearWrapper>
              <MonthAndYear>
                {moment(el.createdAt, "x").format("MMMM YYYY")}
              </MonthAndYear>
            </MonthAndYearWrapper>
          ) : (
            <>
              {workoutsData &&
                workoutsData &&
                isNewMonthTimeStamp(
                  workoutsData[idx - 1]?.createdAt,
                  workoutsData[idx]?.createdAt,
                ) && (
                  <MonthAndYearWrapper>
                    <MonthAndYear>
                      {moment(el.createdAt, "x").format("MMMM YYYY")}
                    </MonthAndYear>
                  </MonthAndYearWrapper>
                )}
            </>
          )}
          <WorkoutWrapper>
            <WorkoutCard setPopup={setPopup} workout={el as Workout} />
          </WorkoutWrapper>
        </React.Fragment>
      ))}
      {workoutsData && workoutsData && workoutsData?.length <= 0 && (
        <NoWorkoutsText>
          You have no workouts in this time period or the workout name you've
          provided does not match
        </NoWorkoutsText>
      )}
    </WorkoutsWrapper>
  );
};
export default WorkoutsList;
