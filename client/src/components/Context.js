import React, { useState } from "react";
import { Buffer } from "buffer";

export const Context = React.createContext();

export const Provider = (props) => {
  const [courses, setCourses] = useState([]);

  function api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = "http://localhost:5000/api" + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      //form submision
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encryptedCredentials = Buffer.from(
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encryptedCredentials}`;
    }
    return fetch(url, options);
  }

  //--------functions------//
  async function getCourses() {
    const response = await api("/courses");
    if (response.status === 200) {
      response.json().then((data) => setCourses(data));

      return courses;
    }
  }

  return (
    <Context.Provider
      value={{
        courses,
        actions: {
          getCourses,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;
