import React, { useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const CreateCourse = ({ context }) => {
  // const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const title = useRef();
  const description = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();

  // const body = {
  //   title,
  //   description,
  //   estimatedTime,
  //   materialsNeeded,
  // };

  const handleCreate = () => {
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
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("server error line 41 create course");
        // navigate("/error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {/* {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null} */}
        <form onSubmit={handleSubmit}>
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

              <p>By Joe Smith</p>

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
          <button
            className="button"
            type="submit"
            onClick={() => handleCreate()}
          >
            Create Course
          </button>

          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
