import React from "react";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <div>
        <h1>Rides</h1>
        <Link to="/sign-up">Sign up</Link>
        <Link to="/log-in">Log in</Link>
    </div>
  );
};

export default Landing;
