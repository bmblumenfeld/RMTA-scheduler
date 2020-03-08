import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import {
  COLORS,
  SCHEDULE_WIDTH,
  BUS_HEIGHT,
  TITLE_COLUMN_WIDTH,
  BUS_TITLE_SIZE,
  SCHEDULE_NUM
} from "../constants";
import Trip from "./Trip";
import { moveTrip } from "../actions";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

const TOAST_LIFETIME = 3000;

const calculateMinTripStart = trips => {
  let minStartTime = trips[0].startTime;
  for (let i = 0; i < trips.length; i++) {
    const trip = trips[i];
    minStartTime = Math.min(minStartTime, trip.startTime);
  }
  const hours = Math.floor(minStartTime / 60);
  const minutes = minStartTime % 60;
  return `${hours}:${minutes}`;
};

const calculateMaxTripEnd = trips => {
  let maxEndTime = trips[0].endTime;
  for (let i = 0; i < trips.length; i++) {
    const trip = trips[i];
    maxEndTime = Math.max(maxEndTime, trip.endTime);
  }
  const hours = Math.floor(maxEndTime / 60);
  const minutes = maxEndTime % 60;
  return `${hours}:${minutes}`;
};

const checkWithinConflict = (movingTrip, currentTrip) => {
  return (
    movingTrip.startTime >= currentTrip.startTime &&
    movingTrip.endTime <= currentTrip.endTime
  );
};

const checkHasStartConflict = (movingTrip, currentTrip) => {
  return (
    movingTrip.startTime <= currentTrip.startTime &&
    movingTrip.endTime >= currentTrip.startTime
  );
};

const checkHasEndConflict = (movingTrip, currentTrip) => {
  return (
    movingTrip.startTime <= currentTrip.endTime &&
    movingTrip.endTime >= currentTrip.endTime
  );
};

// named export for testing
export const checkTripConflict = (trips, movingTrip) => {
  for (let i = 0; i < trips.length; i++) {
    const trip = trips[i];
    if (
      checkHasStartConflict(movingTrip, trip) ||
      checkHasEndConflict(movingTrip, trip) ||
      checkWithinConflict(movingTrip, trip)
    ) {
      return true;
    }
  }
  return false;
};

const Bus = props => {
  const { busId, trips, key, selectedTrip, moveTrip, busIndex } = props;
  const { addToast } = useToasts();
  const cursor = selectedTrip ? "crosshair" : "pointer";

  const triggerToast = selectedTrip => {
    const conflictMessage = `Time Conflict for Trip of ID:${selectedTrip.id} with another scheduled trip for that bus.`;
    addToast(conflictMessage, {
      appearance: "error",
      autoDismiss: true,
      PlacementType: "bottom-left",
      autoDismissTimeout: TOAST_LIFETIME
    });
  };

  const moveTripToNewBus = () => {
    if (!selectedTrip) return;
    if (checkTripConflict(trips, selectedTrip)) {
      triggerToast(selectedTrip);
      return;
    }
    moveTrip(busId, selectedTrip.id);
  };

  const renderBusTimeRange = () => {
    const timeRange = `${calculateMinTripStart(trips)}-${calculateMaxTripEnd(
      trips
    )}`;
    return <div style={styles.timeRange}>{timeRange}</div>;
  };

  const renderBusTitle = busNumber => {
    const title = `Bus ${busNumber + 1}`;
    return (
      <div style={styles.busTitle}>
        <div>{title}</div>
        {renderBusTimeRange()}
      </div>
    );
  };

  const renderTitleColumn = () => {
    return (
      <div style={styles.titleColumn}>
        <FontAwesomeIcon
          icon={faBus}
          size={"2x"}
          color={COLORS.blue300}
          style={styles.busIcon}
        />
        {renderBusTitle(busIndex)}
      </div>
    );
  };

  const renderTrips = () => {
    return (
      <div
        style={{
          ...styles.busContainer,
          cursor: cursor
        }}
        key={key}
        onClick={moveTripToNewBus}
      >
        {trips.map(trip => {
          return <Trip trip={trip} key={trip.id} />;
        })}
      </div>
    );
  };

  return (
    <div style={styles.container} className={"zebra"}>
      {renderTitleColumn()}
      {renderTrips()}
    </div>
  );
};

const mapStateToProps = state => {
  return { selectedTrip: state.selectedTrip };
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    width: `${SCHEDULE_NUM + TITLE_COLUMN_WIDTH}px`
  },
  busContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: SCHEDULE_WIDTH,
    height: BUS_HEIGHT,
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    borderLeft: "0px"
  },
  busTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRight: "2px",
    borderRightStyle: "solid",
    borderColor: COLORS.gray200,
    fontSize: BUS_TITLE_SIZE,
    textAlign: "center",
    width: "100%",
    fontFamily: "sans-serif"
  },
  titleColumn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: `${TITLE_COLUMN_WIDTH}px`,
    height: BUS_HEIGHT,
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    borderRight: "0px"
  },
  timeRange: {
    width: "70px",
    fontSize: "11px",
    color: COLORS.gray400
  },
  busIcon: {
    margin: "10px"
  }
};

export default connect(mapStateToProps, { moveTrip })(Bus);
