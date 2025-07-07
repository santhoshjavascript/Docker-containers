import { useState } from "react";
import styles from "../features/authentication/components/Form.module.css";
import SignUp from "../features/authentication/components/SignUp";
import SignIn from "../features/authentication/components/SignIn";
import Welcome from "../features/authentication/components/Welcome";

function Form() {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <div
      className={`${styles.container} ${
        isActive ? styles.rightPanelActive : ""
      }`}
      id="container"
    >
      <SignUp />
      <SignIn />
      <Welcome handleClick={handleClick} />
    </div>
  );
}

export default Form;
