import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setVisibility } from "../../redux/navbar/navbarActions";
interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVisibility(true));

    return () => {
      console.log("bye");
      dispatch(setVisibility(false));
    };
  }, [dispatch]);
  return <p>Landing page</p>;
};
export default LandingPage;
