import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import { Redirect, Switch, Route } from "react-router-dom";

import AdminPanel from "../AdminPanel/AdminPanel";
import Courses from "../Courses/Courses.jsx";
import UserCourses from "../UserCourses/UserCourses";
import { StoreContext } from "../../store/StoreProvider";

import { default as ContentStyles } from "./Content.module.scss";

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE;

  return (
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        {isUserLogged && (
          <Route exact path="/my-courses" render={() => <UserCourses />} />
        )}
        {isAdmin && (
          <Route exact path="/manage-courses" render={() => <AdminPanel />} />
        )}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Content;
