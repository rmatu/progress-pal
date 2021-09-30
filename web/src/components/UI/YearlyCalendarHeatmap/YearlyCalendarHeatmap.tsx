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

interface YearlyCalendarHeatmapProps {
  values: { date: string; amount: number }[];
  startDate: string;
  endDate: string;
  setStartDate: (value: React.SetStateAction<string>) => void;
  setEndDate: (value: React.SetStateAction<string>) => void;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const YearlyCalendarHeatmap: React.FC<YearlyCalendarHeatmapProps> = ({
  startDate,
  endDate,
  values,
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
  };

  const changeYearHalf = (yearHalf: string) => {
    if (yearHalf === "1") {
      setSelectedHalf("1");
      setStartDate(moment(startDate).set("month", 0).format("YYYY-MM-DD"));
      setEndDate(moment(startDate).set("month", 6).format("YYYY-MM-DD"));
    } else if (yearHalf === "2") {
      setSelectedHalf("2");
      setStartDate(moment(startDate).set("month", 6).format("YYYY-MM-DD"));
      setEndDate(moment(startDate).set("month", 12).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    const newYears = [];
    for (let i = 0; i < 10; i++) {
      newYears.push(Number(moment(endDate).get("y")) - i);
    }
    setYears(newYears);
  }, []);

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
