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
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./PrivateRoute";
import Error from "./components/Error";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";

//------------COMPONENTS WITH CONTEXT-----------//

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const PrivateRouteWithContext = withContext(PrivateRoute);

const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />

      <Routes>
        <Route path="/" element={<CoursesWithContext />} />
        <Route path="courses/:id" element={<CourseDetailWithContext />} />
        <Route
          path="courses/create"
          element={
            <PrivateRouteWithContext>
              <CreateCourseWithContext />
            </PrivateRouteWithContext>
          }
        />
        <Route
          path="courses/:id/update"
          element={
            <PrivateRouteWithContext>
              <UpdateCourseWithContext />
            </PrivateRouteWithContext>
          }
        />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
