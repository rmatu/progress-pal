import React, { useState } from "react";
import moment from "moment";
import CalendarHeatmap from "react-calendar-heatmap";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import {
  Amount,
  AmountText,
  CalendarWrapper,
  Wrapper,
  TrainingAmount,
  Year,
} from "./styles";
import DateRangePicker from "../Date/DateRangePicker/DateRangePicker";

interface YearlyCalendarHeatmapProps {
  values: { date: string; amount: number }[];
  startDate: string;
  endDate: string;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const YearlyCalendarHeatmap: React.FC<YearlyCalendarHeatmapProps> = ({
  startDate,
  endDate,
  values,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <Wrapper>
      <CalendarHeatmap
        startDate={moment(startDate).toDate()}
        endDate={moment(endDate).toDate()}
        showMonthLabels
        showWeekdayLabels
        weekdayLabels={WEEKDAY_LABELS}
        onClick={value => alert(`Clicked on value with count: ${value.amount}`)}
        transformDayElement={(element, value, index) =>
          React.cloneElement(element, { rx: 100, ry: 100 })
        }
        values={values}
      />
      <TrainingAmount>
        <AmountText>Amount of trainings: </AmountText>
        <Amount> {values.length}</Amount>
      </TrainingAmount>
      <CalendarWrapper>
        <Year>{moment(startDate).get("y")}</Year>
        <CalendarIcon onClick={() => setShowCalendar(true)} />
      </CalendarWrapper>
      <DateRangePicker
        modal
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />
    </Wrapper>
  );
};
export default YearlyCalendarHeatmap;
