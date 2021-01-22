import React, { useState } from "react";
import bemCssModules from "bem-css-modules";

import Modal from "../Modal/Modal";

import { default as LoginFormStyles } from "./LoginForm.module.scss";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      <form className={style()} method="POST" onSubmit={}>
        <div className={style("row")}>
          <label>
            <input type="text" />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <input type="password" />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <button type="submit"></button>
            <button type="button"></button>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
