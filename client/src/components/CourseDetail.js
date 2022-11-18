import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = ({ context }) => {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    context.data
      .getCourse()
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>CourseDetail</div>;
};

export default CourseDetail;
