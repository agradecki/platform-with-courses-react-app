import React from "react";
import bemCssModules from "bem-css-modules";
import { Link } from "react-router-dom";

import { default as AsideMenuStyles } from "../AsideMenu.module.scss";

const style = bemCssModules(AsideMenuStyles);

const UserMenu = ({ isUserLogged }) => (
  <React.Fragment>
    <p className={style("title")}>Panel użytkownika</p>
    <nav>
      <ul>
        <li className={style("link")}>
          <Link to="/">Kursy w sprzedaży</Link>
        </li>
        {isUserLogged && (
          <li className={style("link")}>
            <Link to="my-courses">Moje zakupione kursy</Link>
          </li>
        )}
      </ul>
    </nav>
  </React.Fragment>
);

export default UserMenu;
