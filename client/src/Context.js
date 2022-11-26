import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();

    this.cookie = Cookies.get("authenticatedUser");

    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /**
   *
   * @param {string} username - argument that is passed to get user
   * @param {string} password - argument that is passed to get user
   * @returns {object} - returns a user object that will then be included in value and passed via a higher order component
   */
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    const plainText = password;

    if (user !== null) {
      user.password = plainText;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      //Set Cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  /**
   * sign out function that removes cookie and authenticated user object
   */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
