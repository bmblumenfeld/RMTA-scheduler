import {
  generateDefaultBusses,
  generateDefaultBusAssignmentToTrips
} from "./utils";

const TRIP_INPUT = [
  { id: 1, startTime: 30, endTime: 150 },
  { id: 2, startTime: 180, endTime: 300 },
  { id: 3, startTime: 330, endTime: 450 },
  { id: 4, startTime: 40, endTime: 130 },
  { id: 5, startTime: 160, endTime: 250 },
  { id: 6, startTime: 280, endTime: 370 },
  { id: 7, startTime: 400, endTime: 490 },
  { id: 8, startTime: 80, endTime: 240 },
  { id: 9, startTime: 280, endTime: 430 }
];

export const DEFAULT_BUSSES = generateDefaultBusses(TRIP_INPUT);

export const TRIP_DATA = generateDefaultBusAssignmentToTrips(
  DEFAULT_BUSSES,
  TRIP_INPUT
);

export const COLORS = {
  gray100: "#f6f8fa",
  gray200: "#e1e4e8"
};

export const APP_MARGIN = 75;
