import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Container from "./Components/Container";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Container}></Route>
          <Route
            path="/home"
            render={(props) =>
              isLoggedIn(props) ? <Redirect to="/" /> : <HomePage {...props} />
            }
          />
          <Route path="*" render={(props) => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );

  function isLoggedIn(props) {
    if (window.localStorage.getItem("x-auth-token") == null) {
      props.history.push("/");
      return true;
    } else {
      return false;
    }
  }
}

export default App;
