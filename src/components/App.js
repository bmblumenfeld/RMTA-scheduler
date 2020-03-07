import React from "react";
import BusList from "./BusList";
import { APP_MARGIN, SCHEDULE_WIDTH, TITLE_COLUMN_WIDTH } from "../constants";
import SchedulingStatus from "./SchedulingStatus";
import { ToastProvider } from "react-toast-notifications";

const TIME_BANNER_HEIGHT = "60px";

const TimeBanner = () => {
  const times = [];
  const numTimes = 1080 / 2 / 60;
  for (let i = 0; i <= numTimes; i++) {
    const time = `${i}:00`;
    times.push(<div key={Math.random()}>{time}</div>);
  }
  return <div style={styles.timeBanner}>{times}</div>;
};

const App = props => {
  return (
    <ToastProvider>
      <div style={styles.container}>
        <div style={styles.schedulingContainer}>
          <TimeBanner />
          <BusList />
        </div>
        <SchedulingStatus />
      </div>
    </ToastProvider>
  );
};

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "'space-around',"
  },
  schedulingContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: `${APP_MARGIN}px`
  },
  timeBanner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: TIME_BANNER_HEIGHT,
    width: SCHEDULE_WIDTH,
    marginLeft: `${TITLE_COLUMN_WIDTH}px`
  }
};
