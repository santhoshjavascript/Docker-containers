import styles from "./Form.module.css";

function Welcome({ handleClick }) {
  return (
    <div className={styles.overlayContainer}>
      <div className={styles.overlay}>
        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className={styles.ghost} id="signIn" onClick={handleClick}>
            Sign In
          </button>
        </div>
        <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className={styles.ghost} id="signUp" onClick={handleClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
