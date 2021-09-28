import { useApolloClient } from "@apollo/client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { MeQuery, useLogoutMutation } from "../../../generated/graphql";
import { AppState } from "../../../redux/rootReducer";
import { FlexWrapperDiv, FlexWrapperUl } from "../../FlexElements";
import { Button, Logo } from "../../UI";
import {
  Avatar,
  Category,
  CancelWrapper,
  Name,
  NavListItem,
  Wrapper,
} from "./styles";
import * as navActions from "../../../redux/dashboardNavbar/dashboardNavbarActions";
import { ReactComponent as PlusCircle } from "../../../assets/svg/plusCircle.svg";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";

interface DashboardNavbarProps {
  user: MeQuery["me"] | undefined;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ user }) => {
  const { selectedItem, open } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
  };

  const handleClick = (name: string) => {
    dispatch(navActions.changeItem(name));
  };

  return (
    <Wrapper open={open}>
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
        <NavListItem
          selected={selectedItem === "addWorkout"}
          onClick={() => handleClick("addWorkout")}
        >
          Add Workout
          <PlusCircle id="add-circle" />
        </NavListItem>
        <NavListItem
          selected={selectedItem === "addExercise"}
          onClick={() => handleClick("addExercise")}
        >
          Add Exercise
          <PlusCircle id="add-circle" />
        </NavListItem>
      </FlexWrapperUl>
      <FlexWrapperUl
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        margin="1em 0 0 0"
      >
        <Category>Visuals</Category>
        <NavListItem
          selected={selectedItem === "dashboard"}
          onClick={() => handleClick("dashboard")}
        >
          Dashboard
        </NavListItem>
        <NavListItem
          selected={selectedItem === "dailyActivities"}
          onClick={() => handleClick("dailyActivities")}
        >
          Daily Activities
        </NavListItem>
        <NavListItem
          selected={selectedItem === "workouts"}
          onClick={() => handleClick("workouts")}
        >
          Workouts
        </NavListItem>
        <NavListItem
          selected={selectedItem === "donate"}
          onClick={() => handleClick("donate")}
        >
          Donate
        </NavListItem>
      </FlexWrapperUl>
      <FlexWrapperUl
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        margin="1em 0 0 0"
      >
        <Category>Settings</Category>
        <NavListItem
          selected={selectedItem === "account"}
          onClick={() => handleClick("account")}
        >
          Account
        </NavListItem>
        <NavListItem button>
          <Button
            marginTop="1em"
            padding="0.2em 2em"
            fontSize="12px"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </NavListItem>
      </FlexWrapperUl>
      <CancelWrapper onClick={() => dispatch(navActions.setOpen(false))}>
        <Cancel />
      </CancelWrapper>
    </Wrapper>
  );
};
export default DashboardNavbar;
