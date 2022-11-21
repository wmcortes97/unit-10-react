import React from "react";
import { NavLink } from "react-router-dom";

const UserSignUp = ({ context }) => {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await context.actions
      .signIn(emailAddress.current.value, password.current.value)
      .then(navigate("/"));
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue=""
            ref={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue=""
            ref={lastName}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            ref={password}
          />
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
