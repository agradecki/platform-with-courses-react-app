import React, { useState, useContext, useEffect } from "react";
import bemCssModules from "bem-css-modules";

import Modal from "../Modal/Modal";
import { StoreContext } from "../../store/StoreProvider";

import { default as LoginFormStyles } from "./LoginForm.module.scss";
import request from "../../helpers/request";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser } = useContext(StoreContext);

  const handleOnChangeLogin = ({ target }) => setLogin(target.value);
  const handleOnChangePassword = ({ target }) => setPassword(target.value);
  const handleOnCloseModal = (e) => {
    e.preventDefault();
    handleOnClose();
  };

  const resetStateOfInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await request.post("/users", { login, password });

    if (status === 200) {
      setUser(data.user);
      resetStateOfInputs();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      {validateMessageComponent}
      <form className={style()} method="POST" onSubmit={handleOnSubmit}>
        <div className={style("row")}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>

        <div className={style("row")}>
          <label>
            Hasło:
            <input
              onChange={handleOnChangePassword}
              type="password"
              value={password}
            />
          </label>
        </div>

        <div className={style("row")}>
          <label>
            <button type="submit">Zaloguj</button>
            <button onClick={handleOnCloseModal} type="button">
              Anuluj
            </button>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
