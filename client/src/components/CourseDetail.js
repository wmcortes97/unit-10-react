import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => setCourse(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to="update">
            Update Course
          </Link>
          <NavLink
            className="button"
            to="/"
            key={id}
            onClick={() => context.data.deleteCourse(id)}
          >
            Delete Course
          </NavLink>
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
              <p>By Joe Smith</p>
              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {/* {course.materialsNeeded?.map((materials) => {
                  return <li>{materials}</li>;
                })} */}
                <li>{course.materialsNeeded}</li>
                <li>1/2 x 3/4 inch parting strip</li>
                <li>1 x 2 common pine</li>
                <li>1 x 4 common pine</li>
                <li>1 x 10 common pine</li>
                <li>1/4 inch thick lauan plywood</li>
                <li>Finishing Nails</li>
                <li>Sandpaper</li>
                <li>Wood Glue</li>
                <li>Wood Filler</li>
                <li>Minwax Oil Based Polyurethane</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
