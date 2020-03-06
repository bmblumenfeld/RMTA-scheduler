import React from "react";
import { connect } from "react-redux";
import { moveTrip, addBus, removeBus } from "../actions";
import { TRIP_DATA } from "../constants";
import Bus from "./Bus";

const getBusTripList = (busId, trips) => {
  return trips.filter(trip => {
    if (trip.busId === busId) {
      return trip;
    }
  });
};

const BusList = props => {
  const { busses, trips } = props;

  // const renderBusAdder = () => {
  //   return <div></div>;
  // };

  console.log(props);

  return (
    <div>
      {busses.map((bus, index) => {
        const busTrips = getBusTripList(bus.id, trips);
        const isGray = index % 2 === 0 ? false : true;
        if (!busTrips.length) return null;
        return (
          <Bus isGray={isGray} busId={bus.id} trips={busTrips} key={bus.id} />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { busses: state.busses, trips: state.trips };
};

export default connect(mapStateToProps, { addBus, removeBus })(BusList);
