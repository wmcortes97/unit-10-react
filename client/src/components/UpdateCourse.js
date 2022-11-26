import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  //Setting state
  useEffect(() => {
    context.data
      .getCourse(id)
      .then((course) => {
        if (course) {
          if (course.userId !== context.authenticatedUser?.id) {
            navigate("/forbidden");
          }
          setCourse(course);
          setTitle(course.title);
          setDescription(course.description);
          setEstimatedTime(course.estimatedTime);
          setMaterialsNeeded(course.materialsNeeded);
        }
      })
      .catch((err) => navigate("/error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * @param {event object} e - prevents the default functionality of form submission
   * creates a course object that references onChange input defaultValue
   * the course object is them passed to updateCourse function via context along with username and password
   */
  const handleUpdateCourse = (e) => {
    e.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    context.data
      .updateCourse(
        id,
        course,
        context.authenticatedUser.email,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          console.log(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("interal server error", err);
        navigate("/error");
      });
  };

  /**
   * Navigates the user to the course detail page when the press the cancel button
   */

  function handleCancel() {
    navigate(`/courses/${id}`);
  }
  return (
    <main>
      {/* {context.authenticatedUser.id === course.userId ? ( */}
      <div className="wrap">
        <h2>Update Course</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleUpdateCourse}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.defaultValue);
                }}
              />

              <p>
                By {course.firstName} {course.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue={description}
                onChange={(e) => {
                  setDescription(e.target.defaultValue);
                }}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue={estimatedTime}
                onChange={(e) => {
                  setEstimatedTime(e.target.defaultValue);
                }}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue={materialsNeeded}
                onChange={(e) => {
                  setMaterialsNeeded(e.target.defaultValue);
                }}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button onClick={handleCancel} className="button button-secondary">
            Cancel
          </button>
        </form>
      </div>
      {/* ) : (
        navigate("/forbidden")
      )} */}
    </main>
  );
};

export default UpdateCourse;
