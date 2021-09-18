import React from "react";

interface DateInputProps {
  selectedDate: Date;
}

const DateInput: React.FC<DateInputProps> = ({ selectedDate }) => {
  return <p>{selectedDate}</p>;
};

export default DateInput;
