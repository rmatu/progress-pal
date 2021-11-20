import React from "react";
import { Heading } from "..";
import { StyledInput, Wrapper } from "./styles";

interface TimeInputProps {
  placeholder?: string;
  heading?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TimeInput: React.FC<TimeInputProps> = ({
  placeholder,
  heading,
  value,
  setValue,
}) => {
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onBlur = (e: any) => {
    const value = e.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));

    const time = toHHMMSS(seconds);
    setValue(time);
  };

  const getSecondsFromHHMMSS = (value: any) => {
    const [str1, str2, str3] = value.split(":");

    let val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (val1 > 23) {
      val1 = 23;
    }

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs: any) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map(val => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  return (
    <Wrapper>
      {heading && (
        <Heading size={"h4"} textAlign="left">
          {heading}
        </Heading>
      )}
      <StyledInput
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};
export default TimeInput;
