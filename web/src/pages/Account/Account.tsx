import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";

import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { ACCOUNT } from "../../constants/routes";

interface AccountProps {}

const Account: React.FC<AccountProps> = () => {
  const { data: userData } = useMeQuery();

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navActions.changeItem(ACCOUNT));
  }, []);

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>Account</RightContent>
    </DashbordLayoutHOC>
  );
};

export default Account;
