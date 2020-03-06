import produce from "immer";
import { v4 as uuidv4 } from "uuid";

export const generateDefaultBusses = trips => {
  const busses = [];
  for (let i = 0; i < trips.length; i++) {
    const busId = uuidv4();
    const bus = { id: busId };
    busses.push(bus);
  }
  return produce(busses, original => original);
};

export const generateDefaultBusAssignmentToTrips = (busses, trips) => {
  const tripsCopy = JSON.parse(JSON.stringify(trips));
  const mappedTrips = [];
  for (let i = 0; i < tripsCopy.length; i++) {
    const trip = tripsCopy[i];
    const bus = busses[i];
    trip["busId"] = bus.id;
    mappedTrips.push(trip);
  }
  return produce(mappedTrips, original => original);
};
