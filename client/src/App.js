import React from "react";
import { Route, Routes } from "react-router-dom";
import withContext from "./Context";

//------------------COMPONENTS---------------//
import Header from "./components/Header";
import Courses from "./components/Courses";
import UserSignIn from "./components/UserSignIn";
import CourseDetail from "./components/CourseDetail";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);

const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />

      <Routes>
        <Route path="/" element={<CoursesWithContext />} />
        <Route path="courses/:id" element={<CourseDetailWithContext />} />
        <Route
          path="courses/:id/update"
          element={<UpdateCourseWithContext />}
        />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
