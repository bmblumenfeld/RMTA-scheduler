import React from "react";
import { render } from "@testing-library/react";
import { TRIP_DATA } from "./constants";
// import {Bus} from './components/Bus.js

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

// describe("Data Generator", () => {
//   it("Should return list of trips with buses", () => {

//   })
// });
