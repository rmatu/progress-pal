import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import { toggleNavbar } from "../../../redux/navbar/navbarActions";
import * as ROUTES from "../../../constants/routes";

import { Ul, Li } from "./styles";
import { CgLogOut } from "react-icons/cg";
import { useLogoutMutation, useMeQuery } from "../../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Button } from "../../UI";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const open = useSelector((state: AppState) => state.navbar.open);
  const client = useApolloClient();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  // If the user is not logged in
  if (!data?.me) {
    return (
      <Ul open={open}>
        <Li to={ROUTES.SIGN_IN} onClick={() => dispatch(toggleNavbar())}>
          <Button padding="0.3em 2em">Start for free</Button>
        </Li>
      </Ul>
    );
  } else {
    return (
      <Ul open={open}>
        <Li
          onClick={() => dispatch(toggleNavbar())}
          to={ROUTES.HOME}
          activeStyle={{ borderBottom: "1px solid white" }}
        >
          Home
        </Li>
        <Li
          onClick={() => dispatch(toggleNavbar())}
          to={ROUTES.ACCOUNT}
          activeStyle={{ borderBottom: "1px solid white" }}
        >
          Account
        </Li>
        <Li
          onClick={async () => {
            await logout();
            dispatch(toggleNavbar());
            await client.resetStore();
          }}
          to={ROUTES.SIGN_IN}
        >
          <CgLogOut />
          Logout
        </Li>
      </Ul>
    );
  }
};

export default Menu;
