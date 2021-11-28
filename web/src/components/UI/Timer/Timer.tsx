import React, { useEffect, useState } from "react";
import { Button, Heading, Modal } from "..";
import { ReactComponent as PauseSVG } from "../../../assets/svg/pause.svg";
import { ReactComponent as PlaySVG } from "../../../assets/svg/play.svg";
import { ReactComponent as ResetSVG } from "../../../assets/svg/reset.svg";
import theme from "../../../theme/theme";
import {
  Buttons,
  ButtonsWrapper,
  PauseButton,
  PlayButton,
  ResetButton,
  Time,
  TimerWrapper,
} from "./styles";

interface TimerProps {
  startTime?: Date;
  setTimerSeconds?: any;
}

const prefix = (n: number) => {
  return n < 10 ? `0${n}` : n;
};

const Timer: React.FC<TimerProps> = ({ startTime, setTimerSeconds }) => {
  const [seconds, setSeconds] = useState(0);
  const [rInterval, setRInterval] = useState<number>();
  const [paused, setPaused] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
    setOpenModal(false);
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

  useEffect(() => {
    setTimerSeconds(seconds);
  }, [seconds]);

  return (
    <TimerWrapper>
      <Time>{getTimeToString()}</Time>
      <Buttons>
        <ResetButton onClick={() => setOpenModal(true)}>
          <ResetSVG id="reset" />
        </ResetButton>
        <PauseButton paused={paused} onClick={handlePause}>
          <PauseSVG id="pause" />
        </PauseButton>
        <PlayButton onClick={handlePlay}>
          <PlaySVG id="play" />
        </PlayButton>
      </Buttons>
      <Modal opened={openModal} close={() => setOpenModal(false)}>
        <Heading size="h3" marginB="0.5em">
          Are you sure you want to reset the time?
        </Heading>
        <ButtonsWrapper>
          <Button
            marginTop="1em"
            padding="0.2em 2em"
            fontSize="1.125rem"
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            marginTop="1em"
            padding="0.2em 2em"
            fontSize="1.125rem"
            bColor={theme.colors.errorTextColor}
            type="button"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ButtonsWrapper>
      </Modal>
    </TimerWrapper>
  );
};
export default Timer;
