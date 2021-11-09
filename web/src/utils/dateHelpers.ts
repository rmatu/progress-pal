import moment from "moment";

export const getDateXMonthsBefore = (
  date: Date,
  amountToSubstract: number,
  dayNumber: number,
) => {
  return moment(date)
    .subtract(amountToSubstract, "months")
    .set({ date: dayNumber })
    .toDate();
};

export const isNewMonthTimeStamp = (prevDate: string, currDate: string) => {
  if (moment(prevDate, "x").format("MM") !== moment(currDate, "x").format("MM"))
    return true;
  return false;
};
