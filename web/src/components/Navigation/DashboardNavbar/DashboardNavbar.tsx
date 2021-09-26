import { useApolloClient } from "@apollo/client";
import React from "react";
import { MeQuery, useLogoutMutation } from "../../../generated/graphql";
import { FlexWrapperDiv, FlexWrapperUl } from "../../FlexElements";
import { Button, Logo } from "../../UI";
import { Avatar, Category, Name, NavListItem, Wrapper } from "./styles";

interface DashboardNavbarProps {
  user: MeQuery["me"] | undefined;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ user }) => {
  const client = useApolloClient();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
  };

  return (
    <Wrapper>
      <Logo width="95%" margin="0 .5em 0 0" />
      <FlexWrapperDiv
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar />
        <Name>{user?.username}</Name>
      </FlexWrapperDiv>
      <FlexWrapperUl
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        margin="1em 0 0 0"
      >
        <Category>Actions</Category>
        <NavListItem>Add Workout</NavListItem>
        <NavListItem>Add Exercise</NavListItem>
      </FlexWrapperUl>
      <FlexWrapperUl
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        margin="1em 0 0 0"
      >
        <Category>Visuals</Category>
        <NavListItem selected>Dashboard</NavListItem>
        <NavListItem>Daily Activities</NavListItem>
        <NavListItem>Workouts</NavListItem>
        <NavListItem>Donate</NavListItem>
      </FlexWrapperUl>
      <FlexWrapperUl
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        margin="1em 0 0 0"
      >
        <Category>Settings</Category>
        <NavListItem>Account</NavListItem>
        <NavListItem>
          <Button padding="0.5em 2em" fontSize="12px" onClick={handleLogout}>
            Logout
          </Button>
        </NavListItem>
      </FlexWrapperUl>
    </Wrapper>
  );
};
export default DashboardNavbar;
