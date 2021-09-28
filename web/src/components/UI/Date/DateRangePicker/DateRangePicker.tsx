import React, { useState } from "react";
import { DateRangePicker as DateRangePickerNPM } from "react-date-range";
import { Wrapper } from "./styles";
import Modal from "../../Modal/Modal";
import { enGB } from "date-fns/locale";
import { addDays, subDays } from "date-fns";

interface DateRangeProps {
  modal?: boolean;
  showCalendar: boolean;
  setShowCalendar: (showCalendar: boolean) => void;
}

const DateRangePicker: React.FC<DateRangeProps> = ({
  modal,
  showCalendar,
  setShowCalendar,
}) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  if (modal) {
    return (
      <Modal
        opened={showCalendar}
        close={() => setShowCalendar(false)}
        maxWidth="100%"
      >
        <Wrapper>
          <DateRangePickerNPM
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            locale={enGB}
          />
        </Wrapper>
      </Modal>
    );
  }

  return <DateRangePickerNPM />;
};
export default DateRangePicker;
