import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import withContext from "./Context";

//------------------COMPONENTS---------------//
import Header from "./components/Header";
import Courses from "./components/Courses";
import UserSignIn from "./components/UserSignIn";
import CourseDetail from "./components/CourseDetail";
import UserSignOut from "./components/UserSignOut";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignOutWithContext = withContext(UserSignOut);

const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />

      <Routes>
        <Route path="/" element={<CoursesWithContext />} />
        <Route path="courses/:id" element={<CourseDetailWithContext />} />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
