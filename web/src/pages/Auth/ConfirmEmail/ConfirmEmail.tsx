import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useConfirmUserMutation } from "../../../generated/graphql";
import { useRouter } from "../../../hooks/useRouter";
import { Wrapper, LogoContainer } from "./styles";
import * as ROUTES from "../../../constants/routes";
import Loader from "../../../components/UI/Loader/Loader";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";

interface ConfirmEmailProps {}

const ConfirmEmail: React.FC<ConfirmEmailProps> = () => {
  const { token }: any = useParams();
  const router = useRouter();
  const [confirmUser] = useConfirmUserMutation();

  useEffect(() => {
    const asyncConfirmUser = async () => {
      await confirmUser({
        variables: {
          token,
        },
      });
      await router.push(ROUTES.LANDING_PAGE);
    };
    asyncConfirmUser();
  }, [confirmUser, router, token]);

  return (
    <Wrapper>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Loader />
    </Wrapper>
  );
};
export default ConfirmEmail;
