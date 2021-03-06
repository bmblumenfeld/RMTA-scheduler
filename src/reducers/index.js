import produce from "immer";
import { actionTypes } from "../actions";
import { combineReducers } from "redux";
import { TRIP_DATA, DEFAULT_BUSSES } from "../constants";

const busReducer = (busses = DEFAULT_BUSSES, action) => {
  switch (action.type) {
    case actionTypes.addBus:
      const bussesCopy = JSON.parse(JSON.stringify(busses));
      const newBus = action.payload.newBus;
      const addedBusList = [...bussesCopy, newBus];
      return produce(addedBusList, original => original);
    case actionTypes.removeBus:
      const removedBusList = busses.filter(bus => {
        if (action.payload.busId !== bus.id) return bus;
      });
      return produce(removedBusList, original => original);
    default:
      return [...busses];
  }
};

const tripsReducer = (trips = TRIP_DATA, action) => {
  switch (action.type) {
    case actionTypes.addBus:
      const addTripsCopy = JSON.parse(JSON.stringify(trips));
      const busIdToAdd = action.payload.newBus.id;
      const tripsWithMovedToNewBus = addTripsCopy.filter(trip => {
        if (trip.id === action.payload.tripId) {
          trip.busId = busIdToAdd;
          return trip;
        }
        return trip;
      });
      return produce(tripsWithMovedToNewBus, original => original);
    case actionTypes.moveTrip:
      const moveTripsCopy = JSON.parse(JSON.stringify(trips));
      const busIdToMoveTo = action.payload.newBusId;
      const tripIdToMove = action.payload.tripId;
      const movedTrips = moveTripsCopy.filter(trip => {
        if (trip.id === tripIdToMove) {
          trip.busId = busIdToMoveTo;
          return trip;
        }
        return trip;
      });
      return produce(movedTrips, original => original);
    default:
      return [...trips];
  }
};

const selectedReducer = (selected = null, action) => {
  switch (action.type) {
    case actionTypes.selectTrip:
      const selectedTrip = action.payload;
      if (selected && selected.id === selectedTrip.id) {
        return null;
      }
      return selectedTrip;
    case actionTypes.moveTrip:
      return null;
    case actionTypes.addBus:
      return null;
    default:
      return selected;
  }
};

export default combineReducers({
  busses: busReducer,
  trips: tripsReducer,
  selectedTrip: selectedReducer
});
