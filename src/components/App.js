import React from "react";
import BusList from "./BusList";
import { APP_MARGIN } from "../constants";

// const TimeBanner = () => {

//   const

// }

const App = props => {
  return (
    <div style={styles.container}>
      <BusList />
    </div>
  );
};

export default App;

const styles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: `${APP_MARGIN}px`
  }
};
