import React from "react";
import { MessageWrapper } from "./styles";

interface MessageProps {
  error?: boolean | null;
  success?: boolean | null;
  show?: any;
}

const Message: React.FC<MessageProps> = ({
  children,
  error,
  success,
  show,
}) => {
  return (
    <MessageWrapper error={error} success={success} show={show}>
      {children}
    </MessageWrapper>
  );
};

export default Message;
