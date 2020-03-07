import React from "react";
import { generateBus } from "../utils";
import { connect } from "react-redux";
import { addBus, removeBus } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Bus from "./Bus";
import {
  SCHEDULE_WIDTH,
  BUS_HEIGHT,
  COLORS,
  TITLE_COLUMN_WIDTH,
  BUS_TITLE_SIZE
} from "../constants";

const getBusTripList = (busId, trips) => {
  //trips sheduled for a bus
  return trips.filter(trip => {
    if (trip.busId === busId) {
      return trip;
    }
  });
};

const BusList = props => {
  const { busses, trips, removeBus, selectedTrip, addBus } = props;

  const addTripToNewBus = () => {
    const newBus = generateBus();
    addBus(newBus, selectedTrip.id);
  };

  const renderAddBusTitle = () => {
    const addMessage = "New Bus";
    return (
      <div style={styles.addBussTitle}>
        <FontAwesomeIcon
          icon={faPlus}
          size={"2x"}
          color={COLORS.blue300}
          style={styles.addIcon}
        />
        <div style={styles.newBusMessage}>{addMessage}</div>
      </div>
    );
  };

  const renderBusAdder = () => {
    //TODO: generalize Bus logic to render addBus row
    if (!selectedTrip) return null;
    return (
      <div style={styles.addContainer}>
        {renderAddBusTitle()}
        <div onClick={addTripToNewBus} style={styles.busAdder}></div>
      </div>
    );
  };

  const renderBusses = () => {
    return busses.map((bus, index) => {
      const busTrips = getBusTripList(bus.id, trips);
      if (!busTrips.length) {
        removeBus(bus.id);
        return null;
      }
      return (
        <Bus busIndex={index} busId={bus.id} trips={busTrips} key={bus.id} />
      );
    });
  };

  return (
    <div>
      {renderBusses()}
      {renderBusAdder()}
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
  addContainer: {
    display: "flex",
    flexDirection: "row"
  },
  busAdder: {
    width: SCHEDULE_WIDTH,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: BUS_HEIGHT,
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    borderLeft: "0px"
  },
  addBussTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: `${TITLE_COLUMN_WIDTH}px`,
    height: BUS_HEIGHT,
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    borderRight: "0px"
  },
  newBusMessage: {
    borderRight: "2px",
    borderRightStyle: "solid",
    borderColor: COLORS.gray200,
    fontSize: BUS_TITLE_SIZE,
    textAlign: "center",
    width: "100%",
    fontFamily: "sans-serif"
  },
  addIcon: {
    margin: "10px"
  }
};

export default connect(mapStateToProps, { addBus, removeBus })(BusList);
