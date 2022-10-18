import React from "react";
import Nav from './Nav';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from "./MainPage";

import AttendeesList from "./AttendeesList";
import LocationForm from './LocationForm';
import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConferenceForm";
import PresentationForm from "./PresentationForm";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="attendees">
            <Route path="" element={<AttendeesList />} />
          </Route>
          <Route path="presentation">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
{/* <LocationForm /> */ }
{/* <AttendeesList attendees={props.attendees} /> */ }
{/* <ConferenceForm /> */ }
{/* <AttendeeForm /> */ }
