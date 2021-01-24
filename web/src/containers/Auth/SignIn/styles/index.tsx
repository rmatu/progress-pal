import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  color: white;
  position: relative;
  background-color: #2f3136;
`;

export const SignUpChangeWrapper = styled.div`
  width: 45em;
  height: 100vh;
  background: rgb(45, 52, 54);
  background: linear-gradient(
    32deg,
    rgba(45, 52, 54, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignUpChangeContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2em;
`;

export const GoBack = styled.div`
  z-index: 10;
  position: absolute;
  height: 3em;
  width: 3em;
  top: 2em;
  right: 2em;

  svg {
    fill: white;
  }
`;

export const LogoContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 2em;
  left: 2em;
  svg {
    height: 5em;
    width: 15em;
  }
`;

export const StyledP = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1em;
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2f3136;
  width: 100%;
`;

export const AuthContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthText = styled.p`
  color: ${({ theme }) => theme.colors.grayText};
  font-size: 1.25rem;
`;

export const SocialIcons = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  svg {
    cursor: pointer;
    height: 4em;
    width: 4em;
    margin: 0 0.8em;
  }
`;

export const LoginForm = styled.div`
  max-width: 35em;
`;

export const FieldWrapper = styled.div`
  width: 100%;
`;

export const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
