import React from "react";
import { COLORS, APP_MARGIN } from "../constants";

const calculateTripSize = (startTime, endTime) => {
  //I am choosing to have each minute be 2 px
  const tripDuration = endTime - startTime;
  console.log(tripDuration);
  return `${tripDuration * 2}px`;
};

const calculateTripPosition = startTime => `${APP_MARGIN + startTime * 2}px`;

const Trip = props => {
  const { trip, key } = props;
  return (
    <div
      style={{
        position: "absolute",
        width: calculateTripSize(trip.startTime, trip.endTime),
        left: calculateTripPosition(trip.startTime)
      }}
      key={key}
    >
      {trip.id}
    </div>
  );
};

export default Trip;

const styles = {
  tripContainer: {
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200
  }
};
