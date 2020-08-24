import React, { Fragment, useEffect } from "react";
import {
  Navbar,
  Landing,
  Login,
  Register,
  Alert,
  Dashboard,
  PrivateRoute
} from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadUser } from "./actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    //eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </section>
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
