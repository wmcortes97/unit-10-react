import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => setCourse(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    context.data
      .deleteCourse(
        id,
        context.authenticatedUser.email,
        context.authenticatedUser.password
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {context.authenticatedUser &&
          context.authenticatedUser.id === course.userId ? (
            <React.Fragment>
              <Link className="button" to="update">
                Update Course
              </Link>
              <button
                className="button"
                to="/"
                key={id}
                onClick={() => handleDelete(id)}
              >
                Delete Course
              </button>
            </React.Fragment>
          ) : null}

          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By {course.firstName} {course.lastName}
              </p>
              <ReactMarkdown children={course.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
