import { Dispatch } from "redux";
import * as navActions from "../redux/dashboardNavbar/dashboardNavbarActions";

export const setDashboardItem = (
  selectedItem: string,
  pageName: string,
  dispatch: Dispatch<any>,
) => {
  if (selectedItem === pageName) return;

  dispatch(() => navActions.changeItem(pageName));
};
