import React, { useRef } from "react";
import { NavLink, Link } from "react-router-dom";

const CreateCourse = ({ context }) => {
  // const [errors, setErrors] = useState([]);

  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  const body = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
  };

  const handleCreate = (body) => {
    context.data.createCourse(
      body
      // context.authenticatedUser.email,
      // context.authenticatedUser.password
    );
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
              <label for="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue=""
                ref={title}
              />

              <p>By Joe Smith</p>

              <label for="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue=""
                ref={description}
              ></textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue=""
                ref={estimatedTime}
              />

              <label for="materialsNeeded">Materials Needed</label>
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
            onClick={() => handleCreate(body)}
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
