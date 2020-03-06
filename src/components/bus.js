import React from "react";
import { COLORS } from "../constants";
import Trip from "./trip";

const SCHEDULE_END = "1080px";
const ROW_HEIGHT = "40px";

const Bus = props => {
  //need index for shading
  const { busId, trips, key } = props;
  return (
    <div style={styles.busContainer} key={key}>
      {trips.map(trip => {
        return <Trip trip={trip} key={trip.id} />;
      })}
    </div>
  );
};

const styles = {
  busContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: SCHEDULE_END,
    height: ROW_HEIGHT,
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200
  }
};

export default Bus;
