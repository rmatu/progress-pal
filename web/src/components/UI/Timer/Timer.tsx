import React, { useEffect, useState } from "react";
import { ReactComponent as PauseSVG } from "../../../assets/svg/pause.svg";
import { ReactComponent as PlaySVG } from "../../../assets/svg/play.svg";
import { ReactComponent as ResetSVG } from "../../../assets/svg/reset.svg";
import {
  Buttons,
  PauseButton,
  PlayButton,
  ResetButton,
  Time,
  TimerWrapper,
} from "./styles";

interface TimerProps {
  startTime?: Date;
}

const prefix = (n: number) => {
  return n < 10 ? `0${n}` : n;
};

const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const [seconds, setSeconds] = useState(0);
  const [rInterval, setRInterval] = useState<number>();
  const [paused, setPaused] = useState(false);

  const getTimeToString = () => {
    const s = seconds % 60;
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 60 / 60) % 24;

    return `${prefix(h)}:${prefix(m)}:${prefix(s)}`;
  };

  const handleReset = () => {
    clearInterval(rInterval);
    setSeconds(0);
    setPaused(true);
  };

  const handlePlay = () => {
    setPaused(false);
    clearInterval(rInterval);

    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    setRInterval(interval);
  };

  const handlePause = () => {
    setPaused(true);
    clearInterval(rInterval);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    setRInterval(interval);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerWrapper>
      <Time>{getTimeToString()}</Time>
      <Buttons>
        <ResetButton onClick={handleReset}>
          <ResetSVG id="reset" />
        </ResetButton>
        <PauseButton paused={paused} onClick={handlePause}>
          <PauseSVG id="pause" />
        </PauseButton>
        <PlayButton onClick={handlePlay}>
          <PlaySVG id="play" />
        </PlayButton>
      </Buttons>
    </TimerWrapper>
  );
};
export default Timer;
