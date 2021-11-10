import moment from "moment";
import React, { useState } from "react";
import { GetUserWorkoutsQuery, Workout } from "../../../generated/graphql";
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
  workoutsData: GetUserWorkoutsQuery | undefined;
}

const AMOUNT_TO_ADD = 16;

const WorkoutsList: React.FC<WorkoutsListProps> = ({ workoutsData }) => {
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(AMOUNT_TO_ADD);

  const handleScroll = (e: any) => {
    const top = e.target.scrollTop === 0;

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      setEndSlice(prev => prev + AMOUNT_TO_ADD);
    }
  };

  return (
    <WorkoutsWrapper onScroll={handleScroll}>
      {workoutsData?.getUserWorkouts
        ?.slice(startSlice, endSlice)
        .map((el, idx) => (
          <React.Fragment key={el.id}>
            {idx === 0 ? (
              <MonthAndYearWrapper>
                <MonthAndYear>
                  {moment(el.updatedAt, "x").format("MMMM YYYY")}
                </MonthAndYear>
              </MonthAndYearWrapper>
            ) : (
              <>
                {workoutsData &&
                  workoutsData.getUserWorkouts &&
                  isNewMonthTimeStamp(
                    workoutsData?.getUserWorkouts[idx - 1]?.createdAt,
                    workoutsData?.getUserWorkouts[idx]?.createdAt,
                  ) && (
                    <MonthAndYearWrapper>
                      <MonthAndYear>
                        {moment(el.updatedAt, "x").format("MMMM YYYY")}
                      </MonthAndYear>
                    </MonthAndYearWrapper>
                  )}
              </>
            )}
            <WorkoutWrapper>
              <WorkoutCard workout={el as Workout} />
            </WorkoutWrapper>
          </React.Fragment>
        ))}
      {workoutsData &&
        workoutsData.getUserWorkouts &&
        workoutsData?.getUserWorkouts?.length <= 0 && (
          <NoWorkoutsText>
            You have no exercises in this time period
          </NoWorkoutsText>
        )}
    </WorkoutsWrapper>
  );
};
export default WorkoutsList;
