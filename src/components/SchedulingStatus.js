import React, { Fragment } from "react";
import { generateBus } from "../utils";
import { connect } from "react-redux";
import { addBus, removeBus } from "../actions";
import Bus from "./Bus";
import { SCHEDULE_WIDTH, BUS_HEIGHT, COLORS, APP_MARGIN } from "../constants";

const SCHEDULING_STATUS_WIDTH = "300px";

const calculateTimeTripRange = trip => {
  const { startTime, endTime } = trip;
  const startTimeHours = Math.floor(startTime / 60);
  const startTimeMins = startTime % 60;
  const endTimeHours = Math.floor(endTime / 60);
  const endTimeMins = endTime % 60;
  return `${startTimeHours}:${startTimeMins} - ${endTimeHours}:${endTimeMins}`;
};

const calculateTotalTripTime = trip => {
  const { startTime, endTime } = trip;
  const duration = endTime - startTime;
  console.log(duration);
  const durationHours = Math.floor(duration / 60);
  const durationMins = duration % 60;
  return `${durationHours}:${durationMins}`;
};

const SchedulingStatus = props => {
  const { busses, trips, selectedTrip } = props;
  const scheduleTitle = "Schedule Summary";

  const renderSelectedTripSection = () => {
    const selectedTitle = "Selected Trip Info";
    if (!selectedTrip) return null;
    return (
      <Fragment>
        <h3>{selectedTitle}</h3>
        <table>
          <tbody>
            <tr>
              <td>Start and End Time</td>
              <td>{calculateTimeTripRange(selectedTrip)}</td>
            </tr>
            <tr>
              <td>Total Trip Time</td>
              <td>{calculateTotalTripTime(selectedTrip)}</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  };

  return (
    <div style={styles.schedulingStatusContainer}>
      <h3>{scheduleTitle}</h3>
      <table>
        <tbody>
          <tr>
            <td>Trips</td>
            <td>{trips.length}</td>
          </tr>
          <tr>
            <td>Busses</td>
            <td>{busses.length}</td>
          </tr>
        </tbody>
      </table>
      {renderSelectedTripSection()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    busses: state.busses,
    trips: state.trips,
    selectedTrip: state.selectedTrip
  };
};

const styles = {
  schedulingStatusContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: SCHEDULING_STATUS_WIDTH,
    height: "100%",
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    marginLeft: APP_MARGIN,
    marginTop: APP_MARGIN
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

export default connect(mapStateToProps)(SchedulingStatus);
