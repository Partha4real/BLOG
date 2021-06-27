import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Notification from "./components/notification/Notification";
import { getBlogs } from "./actions/blogAction";
import { getUsers } from "./actions/userAction";
import { SIGNIN } from "./actions/actionType";

const PrivateRoute = (privateRouteProps) => {
  const { userAuth, path, component: Component, userData } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return userAuth && userAuth.userType === "admin" ? (
          <Component userData={userData} userAuth={userAuth} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getBlogs());
    if (localStorage.getItem("profile") !== null) {
      dispatch({
        type: SIGNIN,
        data: JSON.parse(localStorage.getItem("profile")),
      });
    }
  }, [dispatch]);

  const userAuth = JSON.parse(localStorage.getItem("profile"));
  const userData = useSelector((state) => state.user);

  const notification = useSelector((state) => {
    return state.notification;
  });

  return (
    <div className="App">
      <Router>
        <Navbar userAuth={userAuth?.result} />
        <Notification
          open={notification?.message ? true : false}
          type={notification?.messageType}
          message={notification?.message}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return <Home />;
            }}
          />
          <PrivateRoute
            path="/users"
            component={Users}
            userAuth={userAuth?.result}
            userData={userData}
          />
          {/* <Route
            exact
            path="/users"
            render={(props) => {
              return <Users userData={userData} userAuth={userAuth?.result} />;
            }}
          /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
