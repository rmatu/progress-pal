import moment from "moment";
import React, { useState } from "react";
import { Button, Modal } from "..";
import { Calendar } from "react-date-range";
import { enGB } from "date-fns/locale";
import { TimeInputWrapper } from "./styles";
import theme from "../../../theme/theme";
import TimeInput from "../TimeInput/TimeInput";
import { ButtonsWrapper } from "./styles";

interface CalendarWithTimeModalProps {
  opened: boolean;
  close: () => void;
  setDateWithTime: React.Dispatch<
    React.SetStateAction<
      | {
          startTime: string;
          endTime: string;
          date: Date;
        }
      | undefined
    >
  >;
}

const CalendarWithTimeModal: React.FC<CalendarWithTimeModalProps> = ({
  opened,
  close,
  setDateWithTime,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(moment().toDate());

  const handleFinish = () => {
    setDateWithTime({
      date,
      startTime,
      endTime,
    });

    close();
  };

  const handleChange = (date: Date) => {
    setDate(date);
  };

  return (
    <Modal opened={opened} close={close} maxWidth="50em">
      <TimeInputWrapper>
        <TimeInput
          placeholder={"hh:mm | hh:mm:ss"}
          heading={"Start time"}
          value={startTime}
          setValue={setStartTime}
        />
        <TimeInput
          placeholder={"hh:mm | hh:mm:ss"}
          heading={"End time"}
          value={endTime}
          setValue={setEndTime}
        />
      </TimeInputWrapper>
      <Calendar
        date={date}
        onChange={handleChange}
        maxDate={moment().toDate()}
        locale={enGB}
        //@ts-ignore
        color={theme.colors.orange}
      />
      <ButtonsWrapper>
        <Button
          bColor={theme.colors.orange}
          fontSize="1rem"
          type="button"
          onClick={handleFinish}
        >
          Finish
        </Button>
      </ButtonsWrapper>
    </Modal>
  );
};
export default CalendarWithTimeModal;
