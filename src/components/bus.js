import React from "react";
import { COLORS } from "../constants";
import Trip from "./Trip";
import { selectTrip, moveTrip } from "../actions";
import { connect } from "react-redux";

const SCHEDULE_END = "1080px";
const ROW_HEIGHT = "40px";

// const isConflict = (trips, tripId) =>  {
//   let isConflict = false
//   trips.forEach(trip=>{

//   })
// }

const Bus = props => {
  //need index for shading
  const {
    busId,
    trips,
    key,
    selectedTrip,
    selectTrip,
    moveTrip,
    isGray
  } = props;
  const backgroundColor = isGray ? COLORS.gray100 : COLORS.white;
  // const moveTripToNewBus = () => {
  //   if(!selectTrip) return
  //   if()

  // }
  return (
    <div
      style={{ ...styles.busContainer, background: backgroundColor }}
      key={key}
    >
      {trips.map(trip => {
        return <Trip trip={trip} key={trip.id} />;
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { selectedTrip: state.selectedTrip };
};

const styles = {
  busContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: SCHEDULE_END,
    height: ROW_HEIGHT,
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200
  }
};

export default connect(mapStateToProps, { selectTrip })(Bus);
