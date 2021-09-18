import moment from "moment";
import React from "react";
import { Calendar as PackageCalendar } from "react-date-range";

interface CalendarProps {
  selectedDate: Date;
  changeDate: (currDate: Date) => void;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  changeDate,
  setFieldValue,
}) => {
  const handleSelect = (date: Date) => {
    changeDate(moment(date).toDate());
    if (setFieldValue) {
      setFieldValue("birthDate", moment(date).format("DD[/]MM[/]YYYY"), true);
    }
  };

  return (
    <PackageCalendar
      date={moment(selectedDate).toDate()}
      onChange={handleSelect}
      maxDate={moment().toDate()}
    />
  );
};

export default Calendar;
