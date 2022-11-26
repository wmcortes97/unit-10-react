import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = ({ context }) => {
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  const navigate = useNavigate();

  const title = useRef();
  const description = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();

  /**
   *
   * @param {event object} e - prevents the default functionality of form submission
   *  creates a course object that references input values
   *  * the course object is them passed to createCourse function via context along with username and password
   */

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const course = {
      userId: context.authenticatedUser.id,
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };
    context.data
      .createCourse(
        course,
        context.authenticatedUser.email,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };
  /**
   * Navigates the user to the course detail page when the press the cancel button
   */
  function handleCancel() {
    navigate("/");
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
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
        <form onSubmit={handleCreateCourse}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue=""
                ref={title}
              />

              <p>
                By {authUser.firstName} {authUser.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue=""
                ref={description}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue=""
                ref={estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue=""
                ref={materialsNeeded}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>

          <button onClick={handleCancel} className="button button-secondary">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
