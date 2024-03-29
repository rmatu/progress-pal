import moment from "moment";
import React from "react";
import { Calendar as PackageCalendar } from "react-date-range";
import { ReactComponent as Close } from "../../../../assets/svg/cancel.svg";
import { Wrapper, CloseWrapper } from "./styles";
import { enGB } from "date-fns/locale";
import theme from "../../../../theme/theme";

interface CalendarProps {
  position?: string;
  selectedDate?: Date;
  changeDate: (currDate: any) => void;
  handleClose: () => void;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  position,
  selectedDate,
  changeDate,
  handleClose,
  setFieldValue,
}) => {
  const handleSelect = (date: Date) => {
    changeDate(moment(date).toDate());
    if (setFieldValue) {
      setFieldValue("birthDate", moment(date).format("DD[/]MM[/]YYYY"), true);
    }
    handleClose();
  };

  return (
    <Wrapper position={position}>
      <PackageCalendar
        date={moment(selectedDate).toDate()}
        onChange={handleSelect}
        maxDate={moment().toDate()}
        locale={enGB}
        //@ts-ignore
        color={theme.colors.orange}
      />
      <CloseWrapper onClick={handleClose}>
        <Close />
      </CloseWrapper>
    </Wrapper>
  );
};

export default Calendar;
