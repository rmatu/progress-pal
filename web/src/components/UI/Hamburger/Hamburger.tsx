import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import { StyledBurger } from "./styles";
import * as navActions from "../../../redux/navbar/navbarActions";
interface HamburgerProps {}

const Hamburger: React.FC<HamburgerProps> = () => {
  const open = useSelector((state: AppState) => state.navbar.open);
  const dispatch = useDispatch();

  return (
    <StyledBurger
      open={open}
      onClick={() => dispatch(navActions.toggleNavbar())}
    >
      <span></span>
      <span></span>
      <span></span>
    </StyledBurger>
  );
};

export default Hamburger;
