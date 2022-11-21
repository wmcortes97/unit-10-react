import React from "react";
import { NavLink } from "react-router-dom";

const UserSignUp = () => {
  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value="" />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value="" />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <button className="button" type="submit">
            Sign Up
          </button>
          <NavLink className="button button-secondary" to="/">
            Cancel
          </NavLink>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <NavLink to="/signin">sign in</NavLink>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
