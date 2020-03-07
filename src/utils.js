import produce from "immer";
import { v4 as uuidv4 } from "uuid";

export const generateBus = () => {
  const busId = uuidv4();
  const bus = { id: busId };
  return bus;
};

export const generateDefaultBusses = trips => {
  //Generates a new bus for each trip
  //if bus model needs to be extended further todo: create a Bus class
  const busses = [];
  for (let i = 0; i < trips.length; i++) {
    const newBus = generateBus();
    busses.push(newBus);
  }
  return produce(busses, original => original);
};

export const generateDefaultBusAssignmentToTrips = (busses, trips) => {
  //Generates a list of trips based on input and extends model with a one to many bus to trips
  //if bus model needs to be extended further todo: create a Trip class
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
