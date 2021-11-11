import moment from "moment";
import React from "react";
import { DateRangePicker } from "react-date-range";
import { Button } from "..";
import theme from "../../../theme/theme";
import ModalScroll from "../ModalScroll/ModalScroll";
import { DateRangePickerWrapper } from "./styles";

//@ts-ignore
import * as locales from "react-date-range/dist/locale";

interface DateRangePickerModalProps {
  handleClose: () => void;
  handleFinish?: () => void;
  minHeight?: string;
  show: boolean;
  heatmapData: {
    startDate: Date;
    endDate: Date;
    key: string;
  }[];
  setHeatmapData: React.Dispatch<
    React.SetStateAction<
      {
        startDate: Date;
        endDate: Date;
        key: string;
      }[]
    >
  >;
}

const DateRangePickerModal: React.FC<DateRangePickerModalProps> = ({
  heatmapData,
  show,
  handleClose,
  handleFinish,
  setHeatmapData,
}) => {
  const handleConfirmDates = () => {
    const currDate = moment();
    const endDate = moment(heatmapData[0].endDate);

    if (endDate.isAfter(currDate)) {
      setHeatmapData([
        {
          ...heatmapData[0],
          endDate: new Date(),
        },
      ]);
    }

    if (handleFinish) {
      handleFinish();
    }

    handleClose();
  };

  return (
    <ModalScroll
      show={show}
      handleClose={handleClose}
      width={"fit-content"}
      minHeight={"570px"}
    >
      <DateRangePickerWrapper>
        <DateRangePicker
          // @ts-ignore
          onChange={(item: any) => setHeatmapData([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          maxDate={new Date()}
          ranges={heatmapData}
          direction="horizontal"
          rangeColors={[theme.colors.orange]}
          locale={locales["enGB"]}
        />
      </DateRangePickerWrapper>
      <Button
        padding="0.2em 1.5em"
        fontSize="1.125rem"
        type="button"
        borderRadius="0.5em"
        onClick={handleConfirmDates}
      >
        Select
      </Button>
    </ModalScroll>
  );
};
export default DateRangePickerModal;
