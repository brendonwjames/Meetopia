import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import CreateEventForm from "./components/CreateEventForm";
import EventListPage from "./components/EventListPage";
import EventDetailsPage from "./components/EventDetailsPage";
import EditEventPage from "./components/EditEventPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <h1>Eventual Splash Landing</h1>
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/events'>
            <EventListPage />
          </Route>
          <Route exact path='/events/new'>
            <CreateEventForm />
          </Route>
          <Route exact path='/events/:eventId'>
            <EventDetailsPage />
          </Route>
          <Route>
            <EditEventPage exact path='/events/:eventId/edit/'/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;