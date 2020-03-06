import React from "react";
import { connect } from "react-redux";
import { moveTrip } from "../actions";
import { TRIP_DATA } from "../constants";
import Bus from "./bus";

const getBusTripList = (busId, trips) => {
  return trips.filter(trip => {
    if (trip.busId === busId) {
      return trip;
    }
  });
};

const BusList = props => {
  const { busses, trips } = props;
  return (
    <div>
      {busses.map((bus, index) => {
        const busTrips = getBusTripList(bus.id, trips);
        return <Bus busId={bus.id} trips={busTrips} key={bus.id} />;
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { busses: state.busses, trips: state.trips };
};

export default connect(mapStateToProps, { moveTrip })(BusList);
