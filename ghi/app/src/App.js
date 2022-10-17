import React from "react";
import Nav from './Nav';
import AttendeesList from "./AttendeesList";
import LocationForm from './LocationForm';
import ConferenceForm from "./ConferenceForm";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
        {/* <LocationForm /> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
        <ConferenceForm />
      </div>
    </React.Fragment>
  );
}

export default App;
