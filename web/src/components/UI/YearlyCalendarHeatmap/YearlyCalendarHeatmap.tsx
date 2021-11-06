import React, { useEffect, useState } from "react";
import moment from "moment";
import CalendarHeatmap from "react-calendar-heatmap";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import {
  Amount,
  AmountText,
  CalendarWrapper,
  Wrapper,
  TrainingAmount,
  PickYear,
  Year,
  Years,
  HalfYearPicker,
  HalfYear,
} from "./styles";
import Modal from "../Modal/Modal";
import {
  Exact,
  GetUserYearlyWorkoutDataQuery,
} from "../../../generated/graphql";
import { QueryLazyOptions } from "@apollo/client";
import Loader from "../Loader/Loader";

interface YearlyCalendarHeatmapProps {
  values:
    | { date: string; amount: number }[]
    | GetUserYearlyWorkoutDataQuery["getUserYearlyWorkoutData"];
  startDate: string;
  endDate: string;
  loadingCalendarData: boolean;
  getAllUserYearlyWorkoutData: (
    options?:
      | QueryLazyOptions<
          Exact<{
            startDate: string;
            endDate: string;
          }>
        >
      | undefined,
  ) => void;
  setStartDate: (value: React.SetStateAction<string>) => void;
  setEndDate: (value: React.SetStateAction<string>) => void;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const YearlyCalendarHeatmap: React.FC<YearlyCalendarHeatmapProps> = ({
  startDate,
  loadingCalendarData,
  endDate,
  values,
  getAllUserYearlyWorkoutData,
  setStartDate,
  setEndDate,
}) => {
  const [showYearsModal, setShowYearsModal] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [selectedHalf, setSelectedHalf] = useState("2");

  const handleClick = (year: number) => {
    setShowYearsModal(false);
    setStartDate(startDate =>
      moment(startDate).set("year", year).format("YYYY-MM-DD"),
    );
    setEndDate(endDate =>
      moment(endDate).set("year", year).format("YYYY-MM-DD"),
    );
    getAllUserYearlyWorkoutData({
      variables: {
        startDate: moment(startDate).set("year", year).format("YYYY-MM-DD"),
        endDate: moment(endDate).set("year", year).format("YYYY-MM-DD"),
      },
    });
  };

  const changeYearHalf = (yearHalf: string) => {
    if (yearHalf === "1") {
      setSelectedHalf("1");
      setStartDate(moment(startDate).set("month", 0).format("YYYY-MM-DD"));
      setEndDate(moment(endDate).set("month", 5).format("YYYY-MM-DD"));
    } else if (yearHalf === "2") {
      setSelectedHalf("2");
      setStartDate(moment(startDate).set("month", 5).format("YYYY-MM-DD"));
      setEndDate(moment(endDate).set("month", 11).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    const newYears = [];
    for (let i = 0; i < 10; i++) {
      newYears.push(Number(moment(endDate).get("y")) - i);
    }
    setYears(newYears);
  }, []);

  if (!values) {
    return (
      <Wrapper noData>
        <Loader />
        <TrainingAmount>
          <AmountText>Amount of trainings: </AmountText>
          <Amount> 0 </Amount>
        </TrainingAmount>
        <HalfYearPicker>
          <HalfYear
            selected={selectedHalf === "1"}
            onClick={() => changeYearHalf("1")}
          >
            1
          </HalfYear>
          /
          <HalfYear
            selected={selectedHalf === "2"}
            onClick={() => changeYearHalf("2")}
          >
            2
          </HalfYear>
        </HalfYearPicker>
        <CalendarWrapper>
          <Year>{moment(startDate).get("y")}</Year>
          <CalendarIcon />
        </CalendarWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <CalendarHeatmap
        startDate={moment(startDate).toDate()}
        endDate={moment(endDate).toDate()}
        showMonthLabels
        showWeekdayLabels
        weekdayLabels={WEEKDAY_LABELS}
        transformDayElement={(element, value, index) =>
          React.cloneElement(element, { rx: 100, ry: 100 })
        }
        values={values}
      />
      <TrainingAmount>
        <AmountText>Amount of trainings: </AmountText>
        <Amount> {values.length}</Amount>
      </TrainingAmount>
      <HalfYearPicker>
        <HalfYear
          selected={selectedHalf === "1"}
          onClick={() => changeYearHalf("1")}
        >
          1
        </HalfYear>
        /
        <HalfYear
          selected={selectedHalf === "2"}
          onClick={() => changeYearHalf("2")}
        >
          2
        </HalfYear>
      </HalfYearPicker>
      <CalendarWrapper>
        <Year>{moment(startDate).get("y")}</Year>
        <CalendarIcon onClick={() => setShowYearsModal(true)} />
      </CalendarWrapper>
      <Modal opened={showYearsModal} close={() => setShowYearsModal(false)}>
        <Years>
          {years.map(el => (
            <PickYear key={el} onClick={() => handleClick(el)}>
              {el}
            </PickYear>
          ))}
        </Years>
      </Modal>
    </Wrapper>
  );
};
export default YearlyCalendarHeatmap;
