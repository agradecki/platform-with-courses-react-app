import React, { useContext } from "react";

import request from "../../../helpers/request";
import { StoreContext } from "../../../store/StoreProvider";

const CourseDetails = (props) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { setCourses } = useContext(StoreContext);
  const { id, title } = props;

  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = (e) => {
    e.preventDefault();
    setIsOpenPopup(false);
  };

  const handleDeleteCourse = async () => {
    try {
      const { status } = await request.delete(`/courses/${id}`);

      if (status === 200) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <details>
      <summary>{title}</summary>
      <button onClick={showPopup}>Edytuj</button>
      <button onClick={handleDeleteCourse}>Usuń</button>
    </details>
  );
};

export default CourseDetails;
