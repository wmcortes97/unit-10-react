import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

//------------------COMPONENTS---------------//
import Header from "./components/Header";
import Courses from "./components/Courses";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Courses />

      {/* <Routes>
        <Route path="/" element={<Courses />} />
      </Routes> */}
    </React.Fragment>
  );
};

export default App;
