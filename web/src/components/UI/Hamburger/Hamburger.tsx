import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as dashboardNavbarActions from "../../../redux/dashboardNavbar/dashboardNavbarActions";
import * as navActions from "../../../redux/navbar/navbarActions";
import { AppState } from "../../../redux/rootReducer";
import { StyledBurger } from "./styles";

interface HamburgerProps {
  dashboardHeader?: boolean;
}

const Hamburger: React.FC<HamburgerProps> = ({ dashboardHeader }) => {
  const open = useSelector((state: AppState) => state.navbar.open);
  const { open: dashboardNavOpen } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    if (dashboardHeader) {
      dispatch(dashboardNavbarActions.toggleNavbar());
    } else {
      dispatch(navActions.toggleNavbar());
    }
  };

  return (
    <StyledBurger
      open={open || dashboardNavOpen}
      onClick={handleClick}
      dashboardHeader={dashboardHeader}
    >
      <span></span>
      <span></span>
      <span></span>
    </StyledBurger>
  );
};

export default Hamburger;
