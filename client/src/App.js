import React from "react";
import "./app.css";
import Login from "./Components/Pages/Login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { useSelector } from "react-redux";
import Loading from "./Components/Pages/Loading";
import Profile from "./Components/Pages/Profile";
import Oprofile from "./Components/Pages/Oprofile";
import Events from "./Components/Pages/Events";
import Jobs from "./Components/Pages/Jobs";
import Chat from "./Components/Pages/Chat";

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
              <Route exact path="/profile/:userid">
                <Oprofile />
              </Route>
              <Route exact path="/events">
                <Events />
              </Route>
              <Route exact path="/jobs">
                <Jobs />
              </Route>
              <Route exact path="/chats">
                <Chat />
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
