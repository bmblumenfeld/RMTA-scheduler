import React from "react";
import { COLORS, APP_MARGIN, TITLE_COLUMN_WIDTH } from "../constants";
import { selectTrip } from "../actions";
import { connect } from "react-redux";

const calculateTripSize = (startTime, endTime) => {
  //I am choosing to have each minute be 2 px
  const tripDuration = endTime - startTime;
  return `${tripDuration * 2}px`;
};

const calculateTripPosition = startTime =>
  `${APP_MARGIN + TITLE_COLUMN_WIDTH + startTime * 2}px`;

const Trip = props => {
  const { trip, key, selectTrip, selectedTrip } = props;
  const { startTime, endTime } = trip;
  const tripWidthStyle = calculateTripSize(startTime, endTime);
  const tripPosition = calculateTripPosition(startTime);
  const tripColor =
    selectedTrip && trip.id === selectedTrip.id ? COLORS.gray200 : COLORS.white;

  const triggerSelectTrip = e => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    selectTrip(trip);
  };

  return (
    <div
      style={{
        ...styles.tripContainer,
        width: tripWidthStyle,
        left: tripPosition,
        background: tripColor
      }}
      onClick={triggerSelectTrip}
      key={key}
    >
      {trip.id}
    </div>
  );
};

const mapStateToProps = state => {
  return { selectedTrip: state.selectedTrip };
};

export default connect(mapStateToProps, { selectTrip })(Trip);

const styles = {
  tripContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    cursor: "crosshair"
  }
};
