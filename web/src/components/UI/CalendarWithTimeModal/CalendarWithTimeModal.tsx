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
  noTime?: boolean;
  setOnlyDate?: (arg: Date) => void;
}

const CalendarWithTimeModal: React.FC<CalendarWithTimeModalProps> = ({
  opened,
  noTime,
  setOnlyDate,
  close,
  setDateWithTime,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(new Date());

  const handleFinish = () => {
    if (endTime) {
      const hours = moment(endTime, "H:m:s").get("hours");
      const minutes = moment(endTime, "H:m:s").get("minutes");
      const seconds = moment(endTime, "H:m:s").get("seconds");

      const newDate = moment(date).set({ hours, minutes, seconds }).toDate();

      setDateWithTime({
        date: newDate,
        startTime,
        endTime,
      });
    } else {
      setDateWithTime({
        date,
        startTime,
        endTime,
      });
    }

    if (setOnlyDate) {
      setOnlyDate(date);
    }

    close();
  };

  const handleChange = (date: Date) => {
    const m = moment();
    const hours = m.get("hours");
    const minutes = m.get("minutes");
    const seconds = m.get("seconds");

    const newDate = moment(date).set({ hours, minutes, seconds }).toDate();
    setDate(newDate);
  };

  return (
    <Modal opened={opened} close={close} maxWidth="50em">
      {!noTime && (
        <TimeInputWrapper>
          <TimeInput
            placeholder={"H:m or H:m:s"}
            heading={"Start time"}
            value={startTime}
            setValue={setStartTime}
          />
          <TimeInput
            placeholder={"H:m or H:m:s"}
            heading={"End time"}
            value={endTime}
            setValue={setEndTime}
          />
        </TimeInputWrapper>
      )}
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
