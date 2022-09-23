import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";

import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import "./App.css";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem("rider.auth") !== null;
  });

  const logIn = async (username, password) => {
    const url = "/api/log_in/";
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem("rider.auth", JSON.stringify(response.data));
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
