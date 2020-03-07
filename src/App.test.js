import React from "react";
import { TRIP_DATA } from "./constants";
import { checkTripConflict } from "./components/Bus";

describe("Data Generator", () => {
  const trips = TRIP_DATA;
  const trip = trips[0];
  it("Should return list of trips with buses", () => {
    expect(trip).toHaveProperty("id");
    expect(trip).toHaveProperty("startTime");
    expect(trip).toHaveProperty("endTime");
    expect(trip).toHaveProperty("busId");
  });
});

describe("Bus", () => {
  it("Handles trip conflict checking", () => {
    const mockTrips = [
      { startTime: 100, endTime: 200 },
      { startTime: 400, endTime: 600 }
    ];
    const tripWithStartConflict = { startTime: 150, endTime: 300 };
    const tripWithEndConflict = { startTime: 300, endTime: 500 };
    const tripWithNoConflict = { startTime: 700, endTime: 800 };

    expect(checkTripConflict(mockTrips, tripWithStartConflict)).toBe(true);
    expect(checkTripConflict(mockTrips, tripWithEndConflict)).toBe(true);
    expect(checkTripConflict(mockTrips, tripWithNoConflict)).toBe(false);
  });
});
