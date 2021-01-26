import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";

import Course from "../Course/Course";
import { StoreContext } from "../../store/StoreProvider";

import { default as CoursesStyles } from "./Courses.module.scss";

const style = bemCssModules(CoursesStyles);

const Courses = () => {
  const { courses } = useContext(StoreContext);

  const coursesElements = courses.map((course) => (
    <Course key={course.id} {...course} />
  ));

  return (
    <section className={style()}>
      <h2 className={style("title")}></h2>
      <ul className={style("list")}>{coursesElements}</ul>
    </section>
  );
};

export default Courses;
