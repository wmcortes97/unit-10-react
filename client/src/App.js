import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//------------------COMPONENTS---------------//
import Header from "./components/Header";
import Courses from "./components/Courses";

const App = () => {
  // const [data, setData] = useState([]);

  // const courseData = () => {
  //   fetch("localhost:5000/api/courses")
  //     .then((response) => response.json())
  //     .then((response) => setData(response));
  // };
  return (
    <React.Fragment>
      <Header />
      <Courses />
    </React.Fragment>
  );
};

export default App;
