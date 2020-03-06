import { actionTypes } from "../actions";
import { combineReducers } from "redux";
import { TRIP_DATA, DEFAULT_BUSSES } from "../constants";

const busReducer = (busses = DEFAULT_BUSSES, action) => {
  const actionTask = action.payload;
  switch (action.type) {
    case actionTypes.moveTrip:
      return [...busses];
    default:
      return [...busses];
  }
};

const tripsReducer = (trips = TRIP_DATA, action) => {
  const actionTask = action.payload;
  switch (action.type) {
    case actionTypes.moveTrip:
      return [...trips];
    default:
      return [...trips];
  }
};

export default combineReducers({
  busses: busReducer,
  trips: tripsReducer
});
