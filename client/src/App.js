import React from "react";
import "./app.css";
import Login from "./Components/Pages/Login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { useSelector } from "react-redux";
import Loading from "./Components/Pages/Loading";
import Profile from "./Components/Pages/Profile";
const App = () => {
  const right = useSelector((state) => state.userdata);
  return (
    <BrowserRouter>
      {right.required ? (
        <Loading />
      ) : (
        <>
          {right.result ? (
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
            </Switch>  
          )}
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
