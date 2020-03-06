export const actionTypes = {
  moveTrip: "MOVE_TRIP"
};

export const moveTrip = change => {
  return {
    type: actionTypes.moveTrip,
    payload: change
  };
};
