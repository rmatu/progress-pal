import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useConfirmUserMutation } from "../../../generated/graphql";
import { useRouter } from "../../../hooks/useRouter";
import {} from "./styles";
import * as ROUTES from "../../../constants/routes";

interface ConfirmEmailProps {}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({}) => {
  const { token }: any = useParams();
  const router = useRouter();
  const [confirmUser] = useConfirmUserMutation();

  useEffect(() => {
    const asyncConfirmUser = async () => {
      console.log(token);
      const res = await confirmUser({
        variables: {
          token,
        },
      });
      console.log(res, "here");
      await router.push(ROUTES.HOME);
    };
    asyncConfirmUser();
  }, [confirmUser, router, token]);

  return <p>hehe xD</p>;
};
export default ConfirmEmail;
