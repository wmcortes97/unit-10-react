import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserSignUp = ({ context }) => {
  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSignUp = () => {
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    context.data
      .createUser(user)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error, "on line 34 in usersignup component");
      });
  };

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

        <form onSubmit={handleSubmit}>
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
          <button
            className="button"
            type="submit"
            onClick={() => handleSignUp()}
          >
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

  //creating a user
  const user = {
    emailAddress,
    password,
  };
};

export default UserSignUp;
