import React from "react";
import { COLORS } from "../constants";
import Trip from "./Trip";
import { moveTrip } from "../actions";
import { connect } from "react-redux";

const SCHEDULE_END = "1080px";
const ROW_HEIGHT = "40px";

const checkTripConflict = (trips, tripToCompare) => {
  let isConflict = false;
  const compareStart = tripToCompare.startTime;
  const compareEnd = tripToCompare.endTime;
  for (let i = 0; i < trips.length; i++) {
    const trip = trips[i];
    const { startTime, endTime } = trip;
    const hasStartTimeConflict =
      compareStart <= startTime && compareEnd >= startTime;
    const hasEndTimeConflict = compareStart <= endTime && compareEnd >= endTime;
    isConflict = hasStartTimeConflict || hasEndTimeConflict;
    if (isConflict) return true;
  }
  return isConflict;
};

const Bus = props => {
  //need index for shading
  const { busId, trips, key, selectedTrip, moveTrip, isGray } = props;
  const backgroundColor = isGray ? COLORS.gray100 : COLORS.white;
  const moveTripToNewBus = () => {
    if (!selectedTrip) return;
    if (checkTripConflict(trips, selectedTrip)) {
      //toast
      return;
    }
    moveTrip(busId, selectedTrip.id);
  };
  return (
    <div
      style={{ ...styles.busContainer, background: backgroundColor }}
      key={key}
      onClick={moveTripToNewBus}
    >
      {trips.map(trip => {
        return <Trip trip={trip} key={trip.id} />;
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { selectedTrip: state.selectedTrip };
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

export default connect(mapStateToProps, { moveTrip })(Bus);
