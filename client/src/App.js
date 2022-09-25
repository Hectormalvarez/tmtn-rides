import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";

import Driver from "./components/Driver";
import Landing from "./components/Landing";
import Rider from "./components/Rider";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import DriverDashboard from "./components/DriverDashboard";
import DriverDetail from "./components/DriverDetail";
import RiderDashboard from './components/RiderDashboard';
import RiderDetail from './components/RiderDetail';

import "./App.css";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem("rides.auth") !== null;
  });

  const logIn = async (username, password) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem("rides.auth", JSON.stringify(response.data));
      setLoggedIn(true);
      return { response, isError: false };
    } catch (error) {
      console.error(error);
      return { response: error, isError: true };
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("rider.auth");
    setLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout isLoggedIn={isLoggedIn} logOut={logOut} />}
      >
        <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="log-in"
          element={<LogIn isLoggedIn={isLoggedIn} logIn={logIn} />}
        />
        <Route path="rider" element={<Rider />}>
          <Route index element={<RiderDashboard />} />
          <Route path=":id" element={<RiderDetail />} />
        </Route>
        <Route path="driver" element={<Driver />}>
          <Route index element={<DriverDashboard />} />
          <Route path=":id" element={<DriverDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

function Layout({ isLoggedIn, logOut }) {
  return (
    <>
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">Rides</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn && (
              <Form>
                <Button type="button" onClick={() => logOut()}>
                  Log out
                </Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="pt-3">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
