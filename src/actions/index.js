export const actionTypes = {
  moveTrip: "MOVE_TRIP",
  addBus: "ADD_BUS",
  removeBus: "REMOVE_BUS",
  selectTrip: "SELECT_TRIP"
};

export const moveTrip = (newBusId, tripId) => {
  return {
    type: actionTypes.moveTrip,
    payload: { newBusId, tripId }
  };
};

export const addBus = (newBus, tripId) => {
  return {
    type: actionTypes.moveTrip,
    payload: { newBus, tripId }
  };
};

export const removeBus = busId => {
  return {
    type: actionTypes.removeBus,
    payload: busId
  };
};

export const selectTrip = trip => {
  return {
    type: actionTypes.selectTrip,
    payload: trip
  };
};
